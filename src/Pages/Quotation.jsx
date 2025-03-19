import React, { useState,useContext,useEffect } from "react";
import "../css/Quotation.css";
import ProgressUpdate from "./ProgressUpdate"
import { HeaderDataContext } from "../Context/HeaderContext";

const Quotation = () => {
  const [creQuotation, setCreQuotation] = useState(false);
  const [page,setPage] = useState("Create Quotation")
  const {
      headerTitle,
      setHeaderTitle,
    } = useContext(HeaderDataContext);


    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        created_company: headerTitle,
       
      }));
    }, [headerTitle])
  const [formData, setFormData] = useState({
    project_name: "",
    client_name: "",
    company_name: "",
    address: "",
    email: "",
    currency: "INR",
    created_company:headerTitle,
    quotation: [
      {
        description: "",
        quantity: "",
        UOM: "",
        unit_price: "",
        // Default currency
      },
    ],
  });

  // Handle Input Change
  const handleInputChange = (index, key, value) => {
    const updatedQuotation = [...formData.quotation];
    updatedQuotation[index][key] = value;
    setFormData({ ...formData, quotation: updatedQuotation });
  };

  // Handle Add Quotation
  const handleAddQuotation = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      quotation: [
        ...prevData.quotation,
        {
          description: "",
          quantity: "",
          UOM: "",
          unit_price: "",
          // Default currency
        },
      ],
    }));
  };

  // Function to determine input type
  const getInputType = (key) => {
    const typeMap = {
      description: "text",
      UOM: "text",
      quantity: "number",
      unit_price: "number",
    };
    return typeMap[key] || "text";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingQuotations =
      JSON.parse(localStorage.getItem(`${headerTitle}-quotation`)) || [];

    // Append new form data to existing data
    const updatedQuotations = [...existingQuotations, formData];

    // Store updated data in localStorage
    localStorage.setItem(`${headerTitle}-quotation`, JSON.stringify(updatedQuotations));
    setFormData({
      company_name :headerTitle,
      project_name: "",
      client_name: "",
      company_name: "",
      address: "",
      email: "",
      currency: "INR",
      created_company:headerTitle,
      quotation: [
        {
          description: "",
          quantity: "",
          UOM: "",
          unit_price: "",
          // Default currency
        },
      ],
    });
    setCreQuotation(false);
  };
console.log("formdata",formData.created_company, "header-title", headerTitle)
  return (
    <div>
      <div className="d-flex justify-content-center gap-3">
        <button className="payment-status-button" onClick={()=>setPage("Create Quotation")} style={{backgroundColor: page ==="Create Quotation" ? "blue" : "red"}}>Create Quotation</button>
        <button className="payment-status-button" onClick={()=>setPage("Quotation Detail")} style={{backgroundColor: page ==="Quotation Detail" ? "blue" : "red"}}>Quotation Detail</button>
      </div>
     {page==="Create Quotation" ?
      <div className="quotation-form-div">
        <form onSubmit={handleSubmit}>
          {/* Project Input */}
          <div className="d-flex flex-column">
            <label className="quotation-input-label">Project</label>
            <input
              className="quotation-input-div mb-2"
              type="text"
              value={formData.project_name}
              onChange={(e) =>
                setFormData({ ...formData, project_name: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <h4>Client Details</h4>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              {" "}
              <div className="d-flex flex-column">
                <label className="quotation-input-label">Client Name</label>
                <input
                  className="quotation-input-div"
                  type="text"
                  value={formData.client_name}
                  onChange={(e) =>
                    setFormData({ ...formData, client_name: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <label className="quotation-input-label">Company Name</label>
                <input
                  className="quotation-input-div"
                  type="text"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              {" "}
              <div className="d-flex flex-column">
                <label className="quotation-input-label">Address</label>
                <input
                  className="quotation-input-div"
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                ></input>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-column">
                <label className="quotation-input-label">Email</label>
                <input
                  className="quotation-input-div"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                ></input>
              </div>
            </div>
          </div>

          <div className="row mb-3" >
            <div className="col-12 col-md-6">
            
                          <select
                            className="quotation-input-div"
                            value={formData.currency}
                            onChange={(e) =>
                              setFormData({ ...formData, currency: e.target.value })
                            }
                          >
                            <option value="USD">USD ($)</option>
                            <option value="INR">Indian Rupee (₹)</option>
                          </select>
                    
            </div>
            <div className="col-12 col-md-6"></div>
          </div>
          <button
            type="button"
            className="quotation-add-quotation-button"
            onClick={() => setCreQuotation(true)}
          >
            Create Quotation
          </button>
          {/* Quotation Fields */}
          {creQuotation && (
            <div className="row mt-3">
              {formData.quotation.map((quotation, qIndex) => (
                <React.Fragment key={qIndex}>
                  <span className="quotation-input-label">
                    Item {qIndex + 1}
                  </span>
                  {Object.keys(quotation).map((key, index) => (
                    <div className="col-12 col-md-6 mb-2" key={index}>
                      <div className="d-flex flex-column">
                        <label className="quotation-input-label">
                          {key
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (char) =>
                              char.toUpperCase()
                            )}{" "}
                        </label>

                        {/* Currency Field as Dropdown */}

                        <input
                          className="quotation-input-div"
                          type={getInputType(key)}
                          value={quotation[key]}
                          onChange={(e) =>
                            handleInputChange(qIndex, key, e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
              <div>
                <button
                  type="button"
                  onClick={handleAddQuotation}
                  className="quotation-add-quotation-button"
                >
                  Add Item
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="quotation-Submit-button"
                 
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {/* Add Quotation Button */}
        </form>
      </div>
    : <ProgressUpdate></ProgressUpdate>  }

    </div>
  );
};

export default Quotation;
