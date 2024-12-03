import React, { useState } from "react";

const ContactUsForm = () => {
  // State hooks for managing form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // You could send the form data to an API or process it here
    console.log("Form Data Submitted:", formData);

    // Set the submitted state to true to display a confirmation message
    setIsSubmitted(true);

    // Optionally, reset the form after submission
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      
      {isSubmitted ? (
        <div className="success-message">
          <p>Thank you for contacting us! We will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ContactUsForm;
