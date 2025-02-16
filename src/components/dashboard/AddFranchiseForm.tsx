 // components/AddFranchiseForm.tsx
import React, { useState } from "react";
import styles from "./styles/AddFranchiseForm.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitFranchiseData } from "../../services/franchiseService";

interface FranchiseFormData {
  firstName: string;
  lastName: string;
  dob: string;
  directorName: string;
  instituteName: string;
  address: string;
  mobile: string;
  email: string;
  aadharId: string;
  password: string;
}

const AddFranchiseForm: React.FC = () => {
  const [formData, setFormData] = useState<FranchiseFormData>({
    firstName: "",
    lastName: "",
    dob: "",
    directorName: "",
    instituteName: "",
    address: "",
    mobile: "",
    email: "",
    aadharId: "",
    password: "",
  });

  // State to manage whether the password field is editable.
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // When the "Edit" button is clicked, enable the password field.
  const handlePasswordEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordEditable(true);
    if (!formData.password) {
      setFormData((prevData) => ({
        ...prevData,
        password: prevData.mobile, // initialize with mobile value if password is empty
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const aadharRegex = /^[0-9]{12}$/;

    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!formData.dob.trim()) {
      toast.error("Date of birth is required");
      return;
    }
    if (!formData.directorName.trim()) {
      toast.error("Director name is required");
      return;
    }
    if (!formData.instituteName.trim()) {
      toast.error("Institute name is required");
      return;
    }
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (!formData.mobile.trim()) {
      toast.error("Mobile number is required");
      return;
    }
    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Invalid mobile number. It should be 10 digits.");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address.");
      return;
    }
    if (!formData.aadharId.trim()) {
      toast.error("Aadhar ID is required");
      return;
    }
    if (!aadharRegex.test(formData.aadharId)) {
      toast.error("Invalid Aadhar ID. It should be 12 digits.");
      return;
    }

    try {
      await submitFranchiseData(formData);
      toast.success("Franchise added successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        directorName: "",
        instituteName: "",
        address: "",
        mobile: "",
        email: "",
        aadharId: "",
        password: "",
      });
      setIsPasswordEditable(false);
    } catch (error) {
      console.error("Error submitting franchise data:", error);
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add Franchise</h2>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {/* First Row: First Name & Last Name */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Second Row: Date of Birth & Director Name */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="directorName">Director Name</label>
            <input
              type="text"
              id="directorName"
              name="directorName"
              value={formData.directorName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Third Row: Institute Name, Mobile Number, and Password */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="instituteName">Institute Name</label>
            <input
              type="text"
              id="instituteName"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password
            <button type="button" className={styles.passEditBtn} onClick={handlePasswordEdit}>
              Edit
            </button>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={isPasswordEditable ? formData.password : formData.mobile}
              onChange={handleChange}
              required
              disabled={!isPasswordEditable}
            />
          </div>
        </div>

        {/* Fourth Row: Email & Aadhar ID */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="aadharId">Aadhar ID</label>
            <input
              type="text"
              id="aadharId"
              name="aadharId"
              value={formData.aadharId}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Full Row: Address */}
        <div className={styles.formRow}>
          <div className={styles.formGroup} style={{ flex: "1" }}>
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFranchiseForm;
