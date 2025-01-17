import { Course, UserCourseProgress, UserProgress } from './data';

// Gimpy course progress tracker class utilizing localstorage
export class ProgressTracker {
	private static localKey = 'cosmic_hall_progress';

	static async getUserProgress(userId: string): Promise<UserProgress | null> {

		const cosmicKey = localStorage.getItem(this.localKey);
		if (!cosmicKey) return null;

		const allProgress: Record<string, UserProgress> = JSON.parse(cosmicKey);
		return allProgress[userId] || null;
	}

	static async setupCourseProgress(userId: string, course: Course): Promise<UserCourseProgress> {
		const courseProgress: UserCourseProgress = {
			courseId: course.id,
			lastAccessedUnit: course.units[0].id,
			lastAccessedSession: course.units[0].sessions[0].id,
			units: course.units.map(unit => ({
				unitId: unit.id,
				status: 'not-started',
				sessions: unit.sessions.map(session => ({
					sessionId: session.id,
					status: 'not-started',
					activities: session.activities.map(activity => ({
						activityId: activity.id,
						status: 'not-started',
						completedQuestions: []
					}))
				}))
			}))
		};

		await this.saveUserProgress(userId, courseProgress);
		return courseProgress;
	}

	static async saveUserProgress(userId: string, courseProgress: UserCourseProgress): Promise<void> {
		if (typeof window === 'undefined') return;

		const cosmicKey = localStorage.getItem(this.localKey);
		const allProgress: Record<string, UserProgress> = cosmicKey ? JSON.parse(cosmicKey) : {};

		if (!allProgress[userId]) {
			allProgress[userId] = { userId, courses: [] };
		}

		const currentCourseIndex = allProgress[userId].courses.findIndex(
			c => c.courseId === courseProgress.courseId
		);

		if (currentCourseIndex >= 0) {
			allProgress[userId].courses[currentCourseIndex] = courseProgress;
		} else {
			allProgress[userId].courses.push(courseProgress);
		}

		localStorage.setItem(this.localKey, JSON.stringify(allProgress));
	}

	static async updateActivityProgress(
		userId: string,
		courseId: string,
		unitId: string,
		sessionId: string,
		activityId: string,
		questionId?: string
	): Promise<void> {

		const progress = await this.getUserProgress(userId);
		if (!progress) return;

		const courseProgress = progress.courses.find(c => c.courseId === courseId);
		if (!courseProgress) return;

		const unit = courseProgress.units.find(u => u.unitId === unitId);
		if (!unit) return;

		const session = unit.sessions.find(s => s.sessionId === sessionId);
		if (!session) return;

		const activity = session.activities.find(a => a.activityId === activityId);
		if (!activity) return;

		if (questionId) {
			if (!activity.completedQuestions.includes(questionId)) {
				activity.completedQuestions.push(questionId);
			}
		}

		// Setting status to started only when a question has been setup
		if (activity.completedQuestions.length > 0) {
			activity.status = 'in-progress';
		}

		// Setting the status to complete only when all activities/sessions are complete
		const allActivitiesComplete = session.activities.every(
			a => a.status === 'complete'
		);
		session.status = allActivitiesComplete ? 'complete' : 'in-progress';
		const allSessionsComplete = unit.sessions.every(
			s => s.status === 'complete'
		);
		unit.status = allSessionsComplete ? 'complete' : 'in-progress';

		await this.saveUserProgress(userId, courseProgress);
	}
}