// NASA mission records, interpreted for young visitors. All dates are historical.
window.missions = [
  {
    id: "apollo", name: "Apollo 15 Lunar Rover", type: "Crewed rover", destination: "Moon", year: 1971, status: "Retired",
    teaser: "Two seats, four wheels and a parking spot on the Moon. This little electric car took geologists’ tools farther than astronauts could carry them.",
    location: "Hadley–Apennine landing site",
    chapters: [
      "Imagine doing fieldwork in a spacesuit. How far could you walk carrying a hammer, a camera and bags of rocks? Astronauts David Scott and James Irwin had another option. Apollo 15 brought the first car anyone had ever driven on the Moon.",
      "The rover rode to the Moon folded against the lunar module Falcon. At the Hadley–Apennine landing site the astronauts unfolded it. They drove across dusty ground to places where exposed rocks could tell different parts of the Moon’s history.",
      "On their second outing, Scott and Irwin picked up a pale rock at Spur Crater. Scientists named the sample the Genesis Rock. Its minerals preserve part of the ancient lunar crust, the Moon’s hard outer layer.",
      "The astronauts parked the rover before they lifted off. Their carefully labeled rock samples came home with them. The car stayed near Falcon’s descent stage. Years later a camera in lunar orbit could still make out rover tracks.",
      "The car made distant sampling stops possible. Knowing exactly where a rock came from matters. A sample’s minerals tell scientists what it is made of, and its place on a slope helps them piece together how it got there."
    ],
    message: "The astronauts brought home a piece of the Moon. The wheels that took them to it are still there.",
    events: [["1971-07-26","Apollo 15 launches from Florida."],["1971-07-30","Falcon lands at Hadley–Apennine."],["1971-07-31","The crew deploys the first lunar car."],["1971-08-01","Scott and Irwin collect the Genesis Rock."],["1971-08-02","The crew lifts off, leaving the rover behind."]],
    sources: [["Apollo 15","https://www.nasa.gov/mission/apollo-15/"],["Apollo 15 Mission Report","https://ntrs.nasa.gov/citations/19720021182"],["Genesis Rock","https://science.nasa.gov/solar-system/moon/genesis-rock/"],["Retracing the Steps of Apollo 15","https://science.nasa.gov/photojournal/retracing-the-steps-of-apollo-15/"]]
  },
  {
    id: "opportunity", name: "Opportunity", type: "Robotic rover", destination: "Mars", year: 2003, status: "Silent",
    teaser: "Little stone spheres nicknamed “blueberries” gave this six-wheeled detective a clue to water on ancient Mars.",
    location: "Perseverance Valley, Endeavour Crater",
    chapters: [
      "Rain can vanish while rocks keep a record of it. NASA sent Opportunity to look for that record on Mars. A camera mast let its team scout the ground ahead. Instruments on a robotic arm let them inspect individual rocks.",
      "Opportunity traveled for about six months. Its landing system delivered it inside Eagle Crater, on a plain called Meridiani Planum. A ledge of exposed rock was already within reach of the rover’s wheels.",
      "Tiny round grains studded the rock like berries in a muffin. The team found an iron mineral called hematite in these “blueberries.” Their shape, chemistry and position in the rock helped scientists infer that groundwater once soaked the site.",
      "Built for 90 Martian days, Opportunity explored for more than 14 Earth years. In June 2018 a huge dust storm darkened the sky above its solar panels. The last signal arrived on June 10. NASA ended the mission in February 2019 after calls went unanswered.",
      "An orbiting spacecraft had detected hematite across the plain. Only a close look from the ground showed the mineral packed into tiny spheres. Comparing both views helped scientists reconstruct the wet past of a place that looks dry today."
    ],
    message: "If you ever find a strange pebble, look at the rock around it. That is how a rover helped read a planet.",
    events: [["2003-07-08","Opportunity launches (UTC, July 7 in California)."],["2004-01-25","Opportunity lands in Eagle Crater (UTC)."],["2004-03-25","NASA publishes the Berry Bowl image and its hematite evidence."],["2018-06-10","The last data arrive during a planet-wide dust storm."],["2019-02-13","NASA declares the mission complete."]],
    sources: [["Opportunity mission","https://science.nasa.gov/mission/mer-opportunity/"],["Meridiani Planum","https://science.nasa.gov/resource/meridiani-planum-2/"],["Discovery Served Up in a Bowl","https://science.nasa.gov/resource/discovery-served-up-in-a-bowl/"],["Opportunity’s Last Message","https://science.nasa.gov/resource/opportunitys-last-message/"],["NASA’s Opportunity Rover Mission on Mars Comes to End","https://science.nasa.gov/missions/mer/nasas-opportunity-rover-mission-on-mars-comes-to-end/"]]
  },
  {
    id: "insight", name: "InSight", type: "Stationary lander", destination: "Mars", year: 2018, status: "Silent",
    teaser: "This explorer stayed in one place. Ripples traveling through the ground brought the inside of Mars to its doorstep.",
    location: "Elysium Planitia",
    chapters: [
      "How could you investigate a planet’s core without digging down to it? InSight carried a seismometer, a tool that senses tiny ground movements. Quakes send waves through a planet. The paths those waves take depend on the material inside.",
      "After launching in May 2018, InSight landed on a broad plain called Elysium Planitia that November. Its robotic arm set the seismometer on the soil. From then on, the ground itself carried the lander’s most important clues.",
      "InSight recorded more than 1,300 marsquakes. By comparing when different waves arrived, scientists worked out details of the layers under the lander. They could investigate Mars’s crust, mantle and core from a single spot on the surface.",
      "Dust slowly covered the lander’s solar panels. With less sunlight available, they could no longer keep its batteries charged. InSight last contacted Earth on December 15, 2022. NASA announced the end of its mission six days later.",
      "In 2025 researchers matched one recorded tremor with a new crater spotted from orbit. The match showed that vibrations from an impact could travel deep into the mantle. The lander had been silent for two years when its old record helped answer a new question."
    ],
    message: "Some of the best exploring happens when you stay very still and wait for the ground to move.",
    events: [["2018-05-05","InSight launches toward Mars."],["2018-11-26","InSight lands on Elysium Planitia."],["2022-12-15","InSight makes its final contact with Earth."],["2022-12-21","NASA announces the lander’s retirement."],["2025-02-03","Researchers link stored quake signals to an impact seen from orbit."]],
    sources: [["InSight mission overview","https://astrobiology.nasa.gov/missions/insight/"],["Science Highlights","https://science.nasa.gov/mission/insight/science-highlights/"],["NASA Retires InSight Mars Lander Mission After Years of Science","https://www.jpl.nasa.gov/news/nasa-retires-insight-mars-lander-mission-after-years-of-science/"],["NASA’s InSight Finds Marsquakes From Meteoroids Go Deeper Than Expected","https://www.jpl.nasa.gov/news/nasas-insight-finds-marsquakes-from-meteoroids-go-deeper-than-expected/"]]
  },
  {
    id: "lcross", name: "LCROSS", type: "Lunar impactor", destination: "Moon", year: 2009, status: "Deliberate Impact",
    teaser: "A rocket stage struck a shadowed crater. A second spacecraft had minutes to read the cloud it kicked up.",
    location: "Cabeus Crater, lunar south pole",
    chapters: [
      "Deep in Cabeus Crater, some ground never sees direct sunlight. Could ice survive there? NASA sent LCROSS, the Lunar Crater Observation and Sensing Satellite, to examine material usually hidden in that permanent shadow.",
      "LCROSS launched alongside the Lunar Reconnaissance Orbiter. The orbiter went its own way. LCROSS stayed with the spent Centaur rocket stage until they separated on their final approach to the Moon.",
      "Centaur struck the crater first. Material flew upward where instruments could inspect it. LCROSS measured the light from this cloud. Different substances leave different patterns in light, and the readings revealed water in the material thrown from Cabeus.",
      "Only about four minutes separated the two impacts. LCROSS sent observations home before it too hit the Moon. Both collisions were planned. The spacecraft that made these measurements could never make a second pass.",
      "The experiment gave scientists a specific place where water ice had survived. Future explorers studying lunar water can ask a more precise question. Which patches of cold ground hold ice, and how does it vary from place to place?"
    ],
    message: "For a few minutes, dust lifted out of darkness gave scientists a way to see what a crater had kept hidden.",
    events: [["2009-06-18","LCROSS launches with the Lunar Reconnaissance Orbiter."],["2009-10-09","Centaur and LCROSS strike Cabeus Crater in sequence."],["2009-11-13","NASA announces that LCROSS observations reveal water."]],
    sources: [["LCROSS mission","https://science.nasa.gov/mission/lcross/"],["LCROSS impact site","https://science.nasa.gov/image-detail/20110615lcross/"]]
  },
  {
    id: "voyager", name: "Voyager 1", type: "Interstellar probe", destination: "Deep Space", year: 1977, status: "Still Traveling",
    teaser: "A picture meant to help steer the spacecraft revealed an erupting moon. Voyager 1 kept going long after that encounter.",
    location: "Interstellar space, beyond the heliopause",
    chapters: [
      "Voyager 1 set out to inspect Jupiter, Saturn and their moons. Its cameras could resolve details too small to see from Earth. Scientists wanted to know what these worlds looked like up close.",
      "A rocket sent Voyager 1 away from Earth in 1977. It swept past Jupiter in 1979 and Saturn in 1980. Gravity bent its path as it passed the giant planets. Beyond Saturn, its journey took it out of the plane where the planets orbit.",
      "A navigation picture showed something sticking out beyond the edge of Jupiter’s moon Io. It was a volcanic plume. This was the first evidence anyone had seen of a volcano erupting on a world other than Earth.",
      "This explorer is still working. In 2012 it crossed the heliopause, the boundary of the Sun’s bubble of charged particles. NASA lists operating instruments on Voyager 1 in its 2026 status record. Engineers have switched others off as the power supply dwindles.",
      "Voyager 1 lets scientists sample the space between stars directly. Its remaining measurements help describe a region no planet or Moon mission can reach. Because the hardware has kept traveling, scientists can ask questions far beyond its original assignment."
    ],
    message: "Imagine building an instrument for Jupiter and hearing from it on the other side of the Sun’s bubble.",
    events: [["1977-09-05","Voyager 1 launches from Florida."],["1979-03-05","Closest approach to Jupiter."],["1980-11-12","Closest approach to Saturn."],["1990-01-01","The Voyager Interstellar Mission officially begins."],["2012-08-25","Voyager 1 crosses into interstellar space."],["2026-04-17","The team switches off a particle instrument to conserve power."]],
    sources: [["Voyager 1 mission","https://science.nasa.gov/mission/voyager/voyager-1/"],["Io Exploration","https://science.nasa.gov/jupiter/jupiter-moons/io/exploration/"],["Discovery of currently active extraterrestrial volcanism","https://ntrs.nasa.gov/citations/19790052442"],["Where Are Voyager 1 and 2 Now?","https://science.nasa.gov/mission/voyager/where-are-voyager-1-and-voyager-2-now/"]]
  }
];
