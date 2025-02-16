// batchService.ts
import axios from "axios";

// Define the interface for the batch data (this should match what your form collects)
export interface BatchData {
  course: string;
  time: string;
}

// Function to add a new batch
export const addBatch = async (data: BatchData): Promise<any> => {
  try {
    // Send a POST request to your backend API endpoint for adding batches
    const response = await axios.post(`/api/batch/add-batch`, data);
    return response.data;
  } catch (error) {
    // You can do additional error handling/logging here
    throw error;
  }
};


// Function to get all batches
export const fetchBatchOptions = async (): Promise<BatchData[]> => {
  try {
    // Send a GET request to your backend API endpoint for getting all batches
    const response = await axios.get<BatchData[]>(`/api/batch/get-batches`);
    return response.data;
  } catch (error) {
    console.error("Error fetching batch options:", error);
    // Fallback sample data
    const sampleData: BatchData[] = [
      { course: "B.Sc Computer Science", time: "9:00 AM - 11:00 AM" },
      { course: "BBA", time: "11:00 AM - 1:00 PM" },
      { course: "MBA", time: "2:00 PM - 4:00 PM" },
      { course: "MCA", time: "10:00 AM - 12:00 PM" },
      { course: "B.Tech", time: "1:00 PM - 3:00 PM" },
      { course: "Diploma in IT", time: "3:30 PM - 5:30 PM" },
      // Add more sample items as needed...
    ];
    return sampleData;
  }
};
