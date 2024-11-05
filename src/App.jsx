import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  IconButton,
  Progress,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { FaHeartbeat, FaWalking, FaAppleAlt, FaBurn } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // State for user preferences
  const [themeColor, setThemeColor] = useState("teal.600");
  const [bgColor, setBgColor] = useState("gray.50");

  // State for sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex minH="100vh" flexDir={{ base: "column", md: "row" }} bg={bgColor}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg={themeColor}
        color="white"
        p={4}
        display={isSidebarOpen ? "block" : { base: "none", md: "block" }} // Toggle sidebar visibility
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">Health Tracker</Text>
          <Text fontSize="lg" mt={8}>Dashboard</Text>
          <Text fontSize="lg">Profile</Text>
          <Text fontSize="lg">Settings</Text>

          {/* Theme Selector */}
          <VStack mt={8} spacing={2} align="start">
            <Text>Choose Theme Color:</Text>
            <HStack spacing={2}>
              {["teal.600", "blue.600", "red.600"].map(color => (
                <Button
                  key={color}
                  size="sm"
                  bg={color}
                  color="white"
                  onClick={() => setThemeColor(color)}
                  _hover={{ opacity: 0.8 }}
                  borderRadius="md"
                  variant={themeColor === color ? "solid" : "outline"}
                  borderWidth={themeColor === color ? "2px" : "1px"}
                  borderColor={themeColor === color ? "white" : color}
                >
                  {color.split('.')[0]} {/* Display color name */}
                </Button>
              ))}
            </HStack>
          </VStack>

          {/* Background Color Selector */}
          <VStack mt={4} spacing={2} align="start">
            <Text>Choose Background Color:</Text>
            <HStack spacing={2}>
              {["gray.50", "blue.50", "orange.50"].map(bg => (
                <Button
                  key={bg}
                  size="sm"
                  bg={bg}
                  color="black"
                  onClick={() => setBgColor(bg)}
                  _hover={{ opacity: 0.8 }}
                  borderRadius="md"
                  variant={bgColor === bg ? "solid" : "outline"}
                  borderWidth={bgColor === bg ? "2px" : "1px"}
                  borderColor={bgColor === bg ? "black" : bg}
                >
                  {bg.split('.')[0]} {/* Display bg color name */}
                </Button>
              ))}
            </HStack>
          </VStack>
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
            onClick={toggleSidebar} // Toggle sidebar on button click
            mb={4}
          />
        )}
        
        <Text fontSize="3xl" fontWeight="bold" mb={4} color={themeColor}>
          Dashboard
        </Text>

        {/* Health Stats with Pie Charts */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
          <StatCard title="Heart Rate" value="75 bpm" icon={<FaHeartbeat />} colors={["#FF6384", "#FFB6C1", "#FFC0CB"]} />
          <StatCard title="Steps" value="8,200" icon={<FaWalking />} colors={["#36A2EB", "#ADD8E6", "#87CEFA"]} />
          <StatCard title="Calories" value="520 kcal" icon={<FaBurn />} colors={["#FFA500", "#FFD700", "#FFB347"]} />
          <StatCard title="Nutrition" value="1200 cal" icon={<FaAppleAlt />} colors={["#4CAF50", "#8BC34A", "#A5D6A7"]} />
        </SimpleGrid>

        {/* Progress Tracking */}
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Progress Tracking</Text>
          <VStack spacing={4} align="stretch">
            <ProgressCard title="Water Intake" value={70} goal="8 cups" />
            <ProgressCard title="Exercise" value={60} goal="30 mins" />
            <ProgressCard title="Sleep" value={80} goal="8 hrs" />
          </VStack>
        </Box>

        {/* Activity Overview */}
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Activity Overview</Text>
          <VStack spacing={4} align="stretch">
            <ActivityCard activity="Morning Run" time="6:00 AM" />
            <ActivityCard activity="Breakfast" time="8:00 AM" />
            <ActivityCard activity="Yoga" time="10:00 AM" />
          </VStack>
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
  // Data for the pie chart
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [70, 30], // Example data for completed and remaining
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => color + "CC"), // Slightly darker on hover
      },
    ],
  };

  return (
    <VStack p={4} borderRadius="md" bg="white" shadow="md" _hover={{ shadow: "lg" }} spacing={4} alignItems="center">
      <Box color={colors[0]} fontSize="2xl">
        {icon}
      </Box>
      <Text fontSize="lg" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="xl" color="gray.600">
        {value}
      </Text>
      <Box width="100px" height="100px">
        <Pie data={data} options={{ maintainAspectRatio: false }} />
      </Box>
    </VStack>
  );
};

const ProgressCard = ({ title, value, goal }) => (
  <Box p={4} bg="white" borderRadius="md" shadow="md">
    <Text fontSize="lg" fontWeight="bold">{title} - {goal}</Text>
    <Progress colorScheme="teal" size="sm" value={value} mt={2} />
  </Box>
);

const ActivityCard = ({ activity, time }) => (
  <HStack p={4} bg="white" borderRadius="md" shadow="md" justify="space-between">
    <Text fontWeight="bold">{activity}</Text>
    <Text color="gray.500">{time}</Text>
  </HStack>
);

const DietCard = ({ meal, items }) => (
  <Box p={4} bg="white" borderRadius="md" shadow="md">
    <Text fontSize="lg" fontWeight="bold">{meal}</Text>
    <Text color="gray.500">{items}</Text>
  </Box>
);

export default Dashboard;
