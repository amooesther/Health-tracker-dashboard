import {
  Box,
  Flex,
  Text,
  VStack,
  SimpleGrid,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaHeartbeat, FaWalking, FaAppleAlt, FaBurn } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, PointElement } from "chart.js";

// Register ChartJS components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement, PointElement);

const Dashboard = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Example data for the graphs
  const progressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Water Intake (cups)",
        data: [7, 8, 7, 8, 7, 8, 7],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const activityData = {
    labels: ["Running", "Walking", "Cycling", "Swimming", "Yoga", "Strength Training"],
    datasets: [
      {
        label: "Activity Duration (mins)",
        data: [30, 45, 60, 25, 50, 40],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <Flex minH="100vh" flexDir={{ base: "column", md: "row" }}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg="teal.600"
        color="white"
        p={4}
        display={{ base: isMobile ? "none" : "block", md: "block" }}
      >
      <VStack spacing={4} align="stretch">
  <Text fontSize="2xl" fontWeight="bold" _hover={{ color: "teal.400" }}>
    Health Tracker
  </Text>
  <Text fontSize="lg" cursor="pointer" mt={8} _hover={{ color: "teal.400" }}>
    Dashboard
  </Text>
  <Text fontSize="lg" cursor="pointer" _hover={{ color: "teal.400" }}>
    Profile
  </Text>
  <Text fontSize="lg" cursor="pointer" _hover={{ color: "teal.400" }}>
    Achievements
  </Text>
  <Text fontSize="lg" cursor="pointer"  _hover={{ color: "teal.400" }}>
    Activity Log
  </Text>
  <Text fontSize="lg" cursor="pointer" _hover={{ color: "teal.400" }}>
    Goals
  </Text>
  <Text fontSize="lg" cursor="pointer" _hover={{ color: "teal.400" }}>
    Settings
  </Text>
</VStack>

      </Box>

      {/* Main Content */}
      <Box flex="1" p={4}>
        {/* Mobile Menu */}
        {isMobile && (
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            size="lg"
            onClick={() => console.log("Open Menu")}
            mb={4}
          />
        )}
        
        <Text fontSize="3xl" fontWeight="bold" mb={4} color="teal.600">
          Dashboard
        </Text>

        {/* Health Stats with Pie Charts */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
          <StatCard title="Heart Rate" value="75 bpm" icon={<FaHeartbeat />} colors={["#FF6384", "#FFB6C1", "#FFC0CB"]} />
          <StatCard title="Steps" value="8,200" icon={<FaWalking />} colors={["#36A2EB", "#ADD8E6", "#87CEFA"]} />
          <StatCard title="Calories" value="520 kcal" icon={<FaBurn />} colors={["#FFA500", "#FFD700", "#FFB347"]} />
          <StatCard title="Nutrition" value="1200 cal" icon={<FaAppleAlt />} colors={["#4CAF50", "#8BC34A", "#A5D6A7"]} />
        </SimpleGrid>

        {/* Progress Tracking Graph */}
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Progress Tracking</Text>
          <Box height="300px">
            <Line data={progressData} options={{ responsive: true, plugins: { title: { display: true, text: "Water Intake Progress" } } }} />
          </Box>
        </Box>

        {/* Activity Overview Graph */}
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Activity Overview</Text>
          <Box height="300px">
            <Line data={activityData} options={{ responsive: true, plugins: { title: { display: true, text: "Weekly Activity Overview" } } }} />
          </Box>
        </Box>

        {/* Recommended Diet */}
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Recommended Diet</Text>
          <VStack spacing={4} align="stretch">
            <DietCard meal="Breakfast" items="Oatmeal, Bananas, Almonds" />
            <DietCard meal="Lunch" items="Grilled Chicken, Quinoa, Vegetables" />
            <DietCard meal="Dinner" items="Salmon, Sweet Potatoes, Spinach" />
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

const StatCard = ({ title, value, icon, colors }) => {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => color + "CC"),
      },
    ],
  };

  return (
    <VStack p={4} borderRadius="md" bg="white" shadow="md" _hover={{ shadow: "lg" }} spacing={4} alignItems="center">
      <Box color={colors[0]} fontSize="2xl">{icon}</Box>
      <Text fontSize="lg" fontWeight="bold">{title}</Text>
      <Text fontSize="xl" color="gray.600">{value}</Text>
      <Box width="100px" height="100px">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </Box>
    </VStack>
  );
};

const DietCard = ({ meal, items }) => (
  <Box p={4} bg="white" borderRadius="md" shadow="md">
    <Text fontSize="lg" fontWeight="bold">{meal}</Text>
    <Text color="gray.500">{items}</Text>
  </Box>
);

export default Dashboard;
