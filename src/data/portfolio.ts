// Shared profile content. Project narratives live in src/content/projects/.
export const PORTFOLIO_DATA = {
  developer: {
    name: "Benjamin Sauer",
    title: "Engineering student · Harvey Mudd College",
    email: "bsauer@g.hmc.edu",
    location: "Upland, California",
    github: "",
    bio: "I’m an engineering student interested in robotics, dynamics, and mechanical design. My work delivers tangible results through simulation that guides hands-on prototyping.",
    resume: "documents/benjamin-sauer-resume.pdf",
    education: "B.S. Engineering · Expected May 2028",
  },
  skills: [
    { category: "Dynamics & Controls", items: ["Python", "MATLAB", "ANSYS Fluent", "State-space modeling", "PID control", "Skyhook control"] },
    { category: "Mechanical Design & Fabrication", items: ["SolidWorks", "Fusion 360", "AutoCAD", "Manual lathe & mill", "CNC machining", "3D printing"] },
    { category: "Electronics & Integration", items: ["Arduino", "Sensor integration & calibration", "PWM motor control", "Oscilloscope", "Multimeter"] },
  ],
  experience: [
    { title: "Civil Engineering Intern", organization: "Fuscoe Engineering", period: "June–August 2026", description: "Prepared AutoCAD plan sets for residential and commercial land-development projects and reviewed utility placement and drawing notation." },
    { title: "Autonomous Underwater Vehicle: Depth Control", organization: "Engineering project", period: "August–December 2025", description: "Integrated pressure and temperature sensors, applied PID control to PWM-driven thrusters, and benchtop-tested sensors and electronics. Measured depth error: 1.07%." },
    { title: "Music Mentors Coordinator", organization: "The Draper Center for Community Partnerships", period: "August 2025-May 2026", description: "Coordinated volunteers, outreach, planning, and communication with families to increase students served by 148% from previous years" },
    { title: "Physics & Math Tutor", organization: "PAYS · Draper Center for Community Partnerships", period: "August 2024-May 2026", description: "Tutored weekly in physics and mathematics. Received the Draper Center Passion in Service award." },
  ],
  leadership: {
    title: "Founder & President, STEM Bridges",
    period: "July 2026–Present",
    description: "I founded STEM Bridges, which uses hands-on engineering projects to connect middle school student with college mentors. My work involves coordinating a team of of 20 volunteers and leads, curriculum planning based on student's needs, as outreach to parents and school administrators",
    status: "9-weeks of lessons planned | MOU in approval-process",
    details: "The program pairs technical exploration with conversations about college preparation, financial aid, scholarships, and other educational pathways.",
  },
};
