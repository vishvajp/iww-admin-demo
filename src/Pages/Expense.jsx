import React, { useEffect, useState, useContext } from "react";
import { HeaderDataContext } from "../Context/HeaderContext";
import "../css/Expense.css";
const Expense = () => {
  const { headerTitle, setHeaderTitle } = useContext(HeaderDataContext);
  const [company, setCompany] = useState(null);
  const [projectName, setProjectName] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showExpense, setShowExpense] = useState(false);
  useEffect(() => {
    if (headerTitle === "Iww Group Of Companies") {
      const singleQuotation = JSON.parse(
        localStorage.getItem(`${company}-purchase_order`)
      );
      setProjectName(singleQuotation);
    }
  }, [company]);

  useEffect(() => {
    const singleQuotation = JSON.parse(
      localStorage.getItem(`${headerTitle}-purchase_order`)
    );
    setProjectName(singleQuotation);
  }, [headerTitle]);

  const handleSelectedProjects = (project) => {
    const selectQuotation = projectName.find((singproject) => {
      return singproject.project_name === project;
    });
    setSelectedProject(selectQuotation);
  };

  const handleQuotation = (quotation) => {
    const selectQuotation = selectedProject?.quotation.find((singproject) => {
      return singproject.description === quotation;
    });
    setSelectedQuotation(selectQuotation);
  };

  console.log(selectedProject?.quotation);
  console.log(selectedQuotation);
  return (
    <div>
      <div className="quotation-form-div">
        {" "}
        <div className="d-flex ">
          {headerTitle === "Iww Group Of Companies" && (
            <select
              className="summary-select-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              <option value="">Select Project</option>
              <option>Cra Energy Solution</option>
              <option>IT Tech</option>
              <option>Precomtech</option>
              <option>PT.SUTAN & HARITZ</option>
            </select>
          )}
        </div>
        <div className="d-flex flex-column mb-2">
          <label>Select Project</label>
          <select
            className="quotation-input-div"
            onChange={(e) => handleSelectedProjects(e.target.value)}
          >
            <option value="">Select Project</option>
            {projectName?.length > 0 ? (
              projectName?.map((quotation, qIndex) => (
                <option key={qIndex} value={quotation.project_name}>
                  {quotation.project_name}
                </option>
              ))
            ) : (
              <option>No Projects Found</option>
            )}
          </select>
        </div>
        <div className="d-flex flex-column mb-2">
          <label>Select Quotation</label>
          <select
            className="quotation-input-div"
            onChange={(e) => handleQuotation(e.target.value)}
          >
            <option value="">Select Item</option>
            {selectedProject?.quotation?.length > 0 ? (
              selectedProject?.quotation?.map((quotation, qIndex) => (
                <option key={qIndex} value={quotation.description}>
                  {quotation.description}
                </option>
              ))
            ) : (
              <option>No Items Found</option>
            )}
          </select>
        </div>
        <div>
          {selectedQuotation && (
            <div>
              <div className="row">
                <div className="d-flex mt-2">
                  <strong>Item Details</strong>
                </div>
                <div className="col">
                  <div className="d-flex flex-column">
                    <lable className="quotation-input-label">Description</lable>
                    <p className="expense-quotation-para mb-2">
                      {" "}
                      {selectedQuotation.description}
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex flex-column">
                    <label className="quotation-input-label">Quantity</label>
                    <p className="expense-quotation-para mb-2">
                      {" "}
                      {selectedQuotation.quantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-column">
                    <lable className="quotation-input-label">Uom</lable>
                    <p className="expense-quotation-para mb-2">
                      {" "}
                      {selectedQuotation.UOM}
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="d-flex flex-column">
                    <label className="quotation-input-label">Unit Price</label>
                    <p className="expense-quotation-para mb-2">
                      {" "}
                      {selectedQuotation.unit_price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-column">
                    <label className="quotation-input-label">
                      Work Percentage
                    </label>
                    <p type="number" className="expense-quotation-para mb-2">
                      {" "}
                      {selectedQuotation.work_percent} %
                    </p>
                  </div>
                </div>
                <div className="col"></div>
              </div>
              <button
                className="quotation-add-quotation-button"
                onClick={() => setShowExpense(!showExpense)}
              >
                Add Expense
              </button>
            </div>
          )}
        </div>
        {showExpense && (
          <div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column">
                  <label className="quotation-input-label">
                    Purchase or Labour{" "}
                  </label>
                  <input className="quotation-input-div mb-2"></input>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column">
                  <label className="quotation-input-label">
                    Person or Quantity
                  </label>
                  <input className="quotation-input-div mb-2"></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                {" "}
                <div className="d-flex flex-column">
                  <lable className="quotation-input-label">Unit Price</lable>
                  <input className="quotation-input-div mb-2"></input>
                </div>{" "}
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex flex-column">
                  <label className="quotation-input-label">Total</label>
                  <input className="quotation-input-div mb-2"></input>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expense;
