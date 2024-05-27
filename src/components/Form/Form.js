import React, { useState } from "react";
import "./form.css";
import { submitRecord } from "../../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import PinataUpload from "./IPFS"; // Import the PinataUpload component

const Form = () => {
  const provider = useSelector((state) => state.provider.connection);
  const medical = useSelector((state) => state.medical.contract);
  const account = useSelector((state) => state.provider.account);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    submitRecord(
      name,
      age,
      gender,
      bloodType,
      allergies,
      diagnosis,
      treatment,
      provider,
      medical,
      dispatch
    );
    setName('');
    setAge('');
    setGender('');
    setBloodType('');
    setAllergies('');
    setDiagnosis('');
    setTreatment('');
  };

  return (
    <div className="login-container">
      <h1></h1>
      {account ? (
        <form onSubmit={submitHandler}>
          <h1>Patient Details</h1>

          {/* Patient Name */}
          <label htmlFor="name">Patient Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />

          {/* Age */}
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            placeholder="Enter Age"
          />

          {/* Gender */}
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Blood Type */}
          <label htmlFor="bloodType">Blood Type:</label>
          <input
            type="text"
            id="bloodType"
            name="bloodType"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
            required
            placeholder="Enter Blood Type"
          />

          {/* Allergies */}
          <label htmlFor="allergies">Allergies:</label>
          <input
            type="text"
            id="allergies"
            name="allergies"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            required
            placeholder="Enter Allergies"
          />

          {/* Diagnosis */}
          <label htmlFor="diagnosis">Diagnosis:</label>
          <input
            type="text"
            id="diagnosis"
            name="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
            placeholder="Enter Diagnosis"
          />

          {/* Treatment */}
          <label htmlFor="treatment">Treatment:</label>
          <input
            type="text"
            id="treatment"
            name="treatment"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
            placeholder="Enter Treatment"
          />

          {/* Pinata Upload Component */}
          <PinataUpload />

          {/* Submit Button */}
          <input type="submit" value="Submit" />
        </form>
      ) : (
        <h1>Connect the account</h1>
      )}
    </div>
  );
};

export default Form;
