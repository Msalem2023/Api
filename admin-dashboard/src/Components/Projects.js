import SelectableList from "./resuable";

const Projects = ({ handelProject }) => {

    const projects = [
        "E-commerce Website",
        "Social Media Platform",
        "Task Management App",
        "Recipe Sharing Platform",
        "Personal Finance Tracker",
        "Travel Planning App",
        "Online Learning Platform",
        "Fitness Tracker",
        "Blogging Platform",
        "Event Management System",
        "Weather App",
        "Virtual Reality Experience",
        "Inventory Management System",
        "Real-time Chat Application",
        "Digital Portfolio Website",
        "Mobile Game Development",
        "Online Marketplace for Freelancers",
        "Music Streaming Service",
        "Personalized News Aggregator",
        "Community Forum Website",
        "Nonprofit Donation Platform"
    ];

    return (
        <>
            <SelectableList
            items={projects} 
            label="Project" 
            handleSelection={handelProject} 
        />
        </>
    );
};

export default Projects;
