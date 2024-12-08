// src/components/MainInfo.jsx

import Task from "./Task";

export default function MainInfo() {
  const tasks = [
    {
      title: "PROBLEMA LICHID PE JOS",
      creator: "Alina Mester",
      category: "Curatenie/casa",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photos: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
      subcategory: "Baie",
      priority: "Urgent",
      assigned: "Mihai Popescu",
      deadline: "2022-12-31",
      // gyms: [
      //   {
      //     name: 'Gym 1',
      //     address: '123 Main St',
      //     city: 'New York',
      //     state: 'NY',
      //     zip: '10001',
      //     phone: '123-456-7890'
      //   }
      // ],
      // users: {
      //   user1: {
      //     name: 'John Doe',
      //     email: ''
      // },
      // user2: {
      //   name: 'Jane Doe',
      //   email: ''
      // }
    },
    {
      title: "PROBLEMA CASA MARCAT",
      creator: "Andreea",
      category: "Curatenie/casa",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photos: ["https://via.placeholder.com/150"],
      subcategory: null,
      priority: "Normal",
      assigned: "Ion Ionescu",
      deadline: "2022-12-31",
    },
    {
      title: "PROBLEMA CURTE MURDARA",
      creator: "Mihai Eminescu",
      category: "Curatenie",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photos: [],
      subcategory: "Curte",
      priority: "Urgent",
      assigned: "Mihai Popescu",
      deadline: null,
    },
  ];

  const fetchTasksData = async () => {
    const response = await axios.get("https://api.example.com/tasks");
    return response.data;
  };

  return (
    <div className="bg-[#455271] h-full rounded-xl m-1 p-4">
      <h2 className="text-5xl font-bold m-10 text-left ml-7 ">TASKS</h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            creator={task.creator}
            category={task.category}
            description={task.description}
            photos={task.photos}
            subcategory={task.subcategory}
            priority={task.priority}
            assigned={task.assigned}
            deadline={task.deadline}
          />
        ))}
      </div>
    </div>
  );
}
