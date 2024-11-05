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
  Select,
} from "@chakra-ui/react";
import { FaHeartbeat, FaWalking, FaAppleAlt, FaBurn } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const Dashboard = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // State for user preferences
  const [themeColor, setThemeColor] = useState("teal.600");
  const [bgColor, setBgColor] = useState("gray.50");

  return (
    <Flex minH="100vh" flexDir={{ base: "column", md: "row" }} bg={bgColor}>
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg={themeColor}
        color="white"
        p={4}
        display={{ base: isMobile ? "none" : "block", md: "block" }}
      >
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">Health Tracker</Text>
          <Text fontSize="lg" mt={8}>Dashboard</Text>
          <Text fontSize="lg">Profile</Text>
          <Text fontSize="lg">Settings</Text>
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
        
        <Text fontSize="3xl" fontWeight="bold" mb={4} color={themeColor}>
          Dashboard
        </Text>

        {/* Theme Selector */}
        <HStack mb={4}>
          <Text>Choose Theme Color:</Text>
          <Select onChange={(e) => setThemeColor(e.target.value)} value={themeColor}>
            <option value="teal.600">Teal</option>
            <option value="blue.600">Blue</option>
            <option value="orange.600">Orange</option>
            <option value="red.600">Red</option>
            <option value="green.600">Green</option>
          </Select>
        </HStack>
        
        <HStack mb={4}>
          <Text>Choose Background Color:</Text>
          <Select onChange={(e) => setBgColor(e.target.value)} value={bgColor}>
            <option value="gray.50">Light Gray</option>
            <option value="white">White</option>
            <option value="blue.50">Light Blue</option>
            <option value="orange.50">Light Orange</option>
            <option value="yellow.50">Light Yellow</option>
          </Select>
        </HStack>

        {/* Health Stats */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <StatCard title="Heart Rate" value="75 bpm" icon={<FaHeartbeat />} color="red.500" />
          <StatCard title="Steps" value="8,200" icon={<FaWalking />} color="blue.500" />
          <StatCard title="Calories" value="520 kcal" icon={<FaBurn />} color="orange.500" />
          <StatCard title="Nutrition" value="1200 cal" icon={<FaAppleAlt />} color="green.500" />
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

        {/* Weight Loss Goals */}
        <Box mt={8}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>Weight Loss Goals</Text>
          <WeightLossGoal currentWeight={70} goalWeight={65} />
        </Box>
      </Box>
    </Flex>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <HStack p={4} borderRadius="md" bg="white" shadow="md" _hover={{ shadow: "lg" }} spacing={4} alignItems="center">
    <Box color={color} fontSize="2xl">{icon}</Box>
    <Box>
      <Text fontSize="lg" fontWeight="bold">{title}</Text>
      <Text fontSize="xl" color="gray.600">{value}</Text>
    </Box>
  </HStack>
);

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

const WeightLossGoal = ({ currentWeight, goalWeight }) => {
  const progress = ((currentWeight - goalWeight) / currentWeight * 100).toFixed(1);

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="md">
      <Text fontSize="lg" fontWeight="bold">Weight Loss Goal</Text>
      <Text color="gray.500">Current: {currentWeight} kg</Text>
      <Text color="gray.500">Goal: {goalWeight} kg</Text>
      <Progress colorScheme="red" size="sm" value={progress} mt={2} />
    </Box>
  );
};

export default Dashboard;
