import { Course } from "./data";

export const mockCourses: Course[] = [
	{
		id: '1',
		name: "Introduction to the Cosmos",
		description: "Explore the fundamental concepts of the universe and its origins",
		courseProgress: { currentUnit: 1, totalUnits: 2 },
		units: [
			{
				id: "1",
				title: "The Big Bang",
				status: "complete",
				progress: 100,
				sessions: [
					{
						id: "1-1",
						title: "What is the Big Bang?",
						duration: "30min",
						status: "complete",
						activities: [
							{
								id: '1',
								title: 'Understanding Cosmic Expansion',
								duration: '10min',
								status: 'not-started',
								description: 'The universe\'s expansion can be observed through the redshift of distant galaxies. When light from these galaxies reaches us, it appears redder than expected, indicating they are moving away from us. This redshift effect, combined with the discovery of cosmic microwave background radiation (a faint glow left over from the early universe), provides compelling evidence for cosmic expansion.',
								questions: [
									{
										id: '1',
										question: 'Based on the description, what is the primary evidence astronomers use to demonstrate that the universe is expanding?',
										correct: 'B',
										options: [
											{ id: 'A', text: 'The changing color of nearby stars' },
											{ id: 'B', text: 'The redshift of light from distant galaxies' },
											{ id: 'C', text: 'The movement of planets in our solar system' },
											{ id: 'D', text: 'The temperature of space' }
										]
									}
								],
							},
							{
								id: '2',
								title: 'Key Evidence of the Big Bang',
								duration: '10min',
								status: 'in-progress',
								description: 'Scientists have discovered three crucial pieces of evidence that support the Big Bang theory. First, we observe the universe expanding through galactic redshift. Second, we find a precise ratio of light elements (particularly hydrogen and helium) throughout the universe that could only have been created in the extreme conditions of the Big Bang. Third, we detect cosmic microwave background radiation, which is essentially the afterglow of the Big Bang itself.',
								questions: [
									{
										id: '2',
										question: 'According to the description, which of these is NOT one of the three main pieces of evidence supporting the Big Bang theory?',
										correct: 'D',
										options: [
											{ id: 'A', text: 'The expansion of the universe' },
											{ id: 'B', text: 'The abundance of light elements' },
											{ id: 'C', text: 'Cosmic microwave background radiation' },
											{ id: 'D', text: 'The existence of black holes' }
										]
									}
								],
							}
						]
					}
				]
			},
			{
				id: "2",
				title: "Galaxies and Stars",
				status: "in-progress",
				progress: 50,
				sessions: [
					{
						id: "2-1",
						title: "The Life Cycle of Stars",
						duration: "60min",
						status: "in-progress",
						activities: [
							{
								id: '1',
								title: 'Birth of Stars in Nebulae',
								duration: '10min',
								status: 'not-started',
								description: 'Stars form within giant molecular clouds called nebulae. The process begins when a portion of the cloud becomes unstable and begins to collapse under its own gravity. This instability can be triggered by shock waves from nearby supernovae or other disturbances. The collapsing cloud must be cold enough for gravity to overcome the internal gas pressure. As the cloud collapses, it fragments into smaller clumps, each of which may form a star. The center of these clumps becomes increasingly dense and hot, eventually reaching temperatures high enough for nuclear fusion to begin.',
								questions: [
									{
										id: '3',
										question: 'According to the description, what triggers the initial collapse of gas in a nebula to form stars?',
										correct: 'C',
										options: [
											{ id: 'A', text: 'High temperatures in the cloud' },
											{ id: 'B', text: 'The presence of other stars' },
											{ id: 'C', text: 'Shock waves from events like supernovae' },
											{ id: 'D', text: 'The rotation of the galaxy' }
										]
									}
								],
							},
							{
								id: '2',
								title: 'Death of Stars: Supernovae and Black Holes',
								duration: '10min',
								status: 'in-progress',
								description: 'The final fate of a star depends crucially on its mass. Stars between 1.4 and 3 solar masses will end their lives as neutron stars, incredibly dense objects where a teaspoon of material would weigh billions of tons. However, stars with cores more massive than 3 solar masses experience such powerful gravitational collapse that they form black holes. When this happens, the gravitational pull becomes so strong that nothing, not even light, can escape from within a boundary called the event horizon.',
								questions: [
									{
										id: '4',
										question: 'Based on the description, what happens to a star whose core is exactly 4 solar masses when it dies?',
										correct: 'A',
										options: [
											{ id: 'A', text: 'It becomes a black hole' },
											{ id: 'B', text: 'It becomes a neutron star' },
											{ id: 'C', text: 'It remains a normal star' },
											{ id: 'D', text: 'It explodes completely with no remnant' }
										]
									}
								],
							}
						]
					}
				]
			}
		]
	},
	{
		id: '2',
		name: "Exploring the Solar System",
		description: "Journey through the planets, moons, and other celestial objects in our solar system",
		courseProgress: { currentUnit: 1, totalUnits: 2 },
		units: [
			{
				id: "1",
				title: "Our Planetary Neighborhood",
				status: "complete",
				progress: 100,
				sessions: [
					{
						id: "1-1",
						title: "Overview of the Solar System",
						duration: "30min",
						status: "complete",
						activities: [
							{
								id: '1',
								title: 'Inner vs. Outer Planets',
								duration: '10min',
								status: 'not-started',
								description: 'Our solar system is divided into two main groups of planets. The inner planets (Mercury, Venus, Earth, and Mars) are relatively small, rocky bodies with solid surfaces and few or no moons. They are closer to the Sun and have no ring systems. In contrast, the outer planets (Jupiter, Saturn, Uranus, and Neptune) are much larger, composed mainly of gases, have numerous moons, and possess ring systems. These gas giants are farther from the Sun and have much longer orbital periods.',
								questions: [
									{
										id: '5',
										question: 'Which characteristic is NOT mentioned in the description as a difference between inner and outer planets?',
										correct: 'D',
										options: [
											{ id: 'A', text: 'Size of the planets' },
											{ id: 'B', text: 'Presence of ring systems' },
											{ id: 'C', text: 'Number of moons' },
											{ id: 'D', text: 'Surface temperature' }
										]
									}
								],
								imgUrl: 'https://placehold.co/350x200/png'
							},
							{
								id: '2',
								title: 'Understanding Orbital Mechanics',
								duration: '10min',
								status: 'in-progress',
								description: 'Kepler\'s three laws of planetary motion describe how planets orbit the Sun. The first law states that planets orbit in ellipses with the Sun at one focus. The second law explains that a line connecting a planet to the Sun sweeps out equal areas in equal times, meaning planets move faster when closer to the Sun. The third law establishes that the square of a planet\'s orbital period is proportional to the cube of its average distance from the Sun.',
								questions: [
									{
										id: '6',
										question: 'According to Kepler\'s second law described above, when does a planet move fastest in its orbit?',
										correct: 'A',
										options: [
											{ id: 'A', text: 'When it is closest to the Sun' },
											{ id: 'B', text: 'When it is farthest from the Sun' },
											{ id: 'C', text: 'At all points in its orbit' },
											{ id: 'D', text: 'When it aligns with other planets' }
										]
									}
								],
								imgUrl: 'https://placehold.co/350x200/png'
							}
						]
					},
					{
						id: "1-2",
						title: "The Role of the Sun",
						duration: "45min",
						status: "complete",
						activities: [
							{
								id: '1',
								title: 'How the Sun Powers the Solar System',
								duration: '10min',
								status: 'not-started',
								description: 'The Sun generates its energy through nuclear fusion in its core, where temperatures reach 15 million degrees Celsius. Under these extreme conditions, hydrogen nuclei combine to form helium, releasing enormous amounts of energy in the process. This energy travels outward through the Sun\'s layers and eventually radiates into space as light and heat. It takes about 170,000 years for energy to travel from the Sun\'s core to its surface, but only 8 minutes to reach Earth.',
								questions: [
									{
										id: '7',
										question: 'How long does it take for energy produced in the Sun\'s core to reach its surface?',
										correct: 'C',
										options: [
											{ id: 'A', text: '8 minutes' },
											{ id: 'B', text: '24 hours' },
											{ id: 'C', text: '170,000 years' },
											{ id: 'D', text: '1 million years' }
										]
									}
								],
								imgUrl: 'https://placehold.co/350x200/png'
							},
							{
								id: '2',
								title: 'Solar Flares and Their Impact',
								duration: '10min',
								status: 'in-progress',
								description: 'Solar flares are intense bursts of radiation from the Sun\'s surface caused by magnetic field disruptions. When these eruptions are accompanied by massive releases of solar material, they\'re called coronal mass ejections (CMEs). These solar events can have significant effects on Earth: they can damage satellites, pose radiation risks to astronauts, disrupt radio communications, and in severe cases, even affect power grids. However, they also create beautiful auroras when solar particles interact with Earth\'s magnetic field.',
								questions: [
									{
										id: '8',
										question: 'What phenomena does the description say is created when solar particles interact with Earth\'s magnetic field?',
										correct: 'B',
										options: [
											{ id: 'A', text: 'Earthquakes' },
											{ id: 'B', text: 'Auroras' },
											{ id: 'C', text: 'Hurricanes' },
											{ id: 'D', text: 'Tsunamis' }
										]
									}
								],
								imgUrl: 'https://placehold.co/350x200/png'
							}
						]
					}
				]
			}
		]
	}
];