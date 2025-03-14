import React, { useState, useEffect,useContext } from "react";
import Quotation from "./Quotation";
import PurchaseDetail from "./PurchaseDetail";
import "../css/PaymentStatus.css";
import { HeaderDataContext } from "../Context/HeaderContext";

const PaymentStatus = () => {
  const [singleQuotation, setSingleQuotation] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [projectSelect, setProjectSelect] = useState(null);
  const [page, setPage] = useState("Purchase Entry");
   const {
        headerTitle,
        setHeaderTitle,
      } = useContext(HeaderDataContext);

  useEffect(() => {
    if (headerTitle === "Iww Group Of Companies") {
    const craQuotations =
    JSON.parse(localStorage.getItem("Cra Energy Solution-quotation")) || [];
  const ITQuotation =
    JSON.parse(localStorage.getItem("IT Tech-quotation")) || [];
  const precomQuotation =
    JSON.parse(localStorage.getItem("Precomtech-quotation")) || [];
  const sutanQuotation =
    JSON.parse(localStorage.getItem("PT.SUTAN & HARITZ-quotation")) || [];
  const purchase = [
    ...craQuotations,
    ...ITQuotation,
    ...precomQuotation,
    ...sutanQuotation,
  ];
  setSingleQuotation(purchase);
    }else{
    const storedQuotations =
    JSON.parse(localStorage.getItem(`${headerTitle}-quotation`)) || []; 
    setSingleQuotation(storedQuotations);
  }
  }, [headerTitle]); // First effect only loads data

  useEffect(() => {
    if (singleQuotation && singleQuotation.length > 0) {
      const existingPurchaseOrder =
        JSON.parse(localStorage.getItem(`${headerTitle}-purchase_order`)) || [];
  
      const projSelect = singleQuotation.filter(
        (singleQuo) =>
          !existingPurchaseOrder.some(
            (purchase) => purchase.project_name === singleQuo.project_name
          )
      );
  
      setProjectSelect(projSelect);
    }
  }, [singleQuotation, selectedProject]); // Runs only when `singleQuotation` updates
  
  

  useEffect(() => {
    if (selectedProject) {
      const foundQuotation = singleQuotation.find(
        (quotation) => quotation.project_name === selectedProject
      );
      setSelectedQuotation(foundQuotation || null);
    } else {
      setSelectedQuotation(null);
    }
  }, [selectedProject, singleQuotation]);
  // console.log(singleQuotation);

  const [formData, setFormData] = useState({
    project_name: "",
    client_name: "",
    company_name: "",
    address: "",
    email: "",
    currency: "INR",
    payment_Status: "",
    job_no: "",
    po_date: "",
    payment_terms: "",
    buyer_contact: "",
    vendor_ref_no: "",
    pr_mto_no: "",
    pr_mto_date: "",
    delivery_terms: "",
    delivery_date: "",
    created_company:"",
    initiator: "",
    payment_amount: 0,
    po_number:0,
    quotation: [],
  });

  useEffect(() => {
    if (selectedQuotation) {
      setFormData((prevData) => ({
        ...prevData,
        project_name: selectedQuotation.project_name,
        client_name: selectedQuotation.client_name,
        company_name: selectedQuotation.company_name,
        address: selectedQuotation.address,
        created_company: selectedQuotation.created_company,

        currency: selectedQuotation.currency,
        quotation: selectedQuotation.quotation.map((quotation) => ({
          description: quotation.description || "",
          quantity: quotation.quantity || 0,
          UOM: quotation.UOM || "",
          unit_price: quotation.unit_price || 0,
          work_percent: quotation.work_percent || 0,
        })),
      }));
    }
  }, [selectedQuotation]);

  useEffect(() => {
        setFormData((prevData) => ({
          ...prevData,
          created_company: headerTitle,
         
        }));
      }, [headerTitle])

  const handleInputChange = (index, key, value) => {
    const updatedQuotation = [...formData.quotation];
    updatedQuotation[index][key] = value;
    setFormData({ ...formData, quotation: updatedQuotation });
  };

  const handleDeleteItem = (index) => {
    const updatedQuotation = [...formData.quotation];
    updatedQuotation.splice(index, 1);
    setFormData({ ...formData, quotation: updatedQuotation });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (e.target.value === "Paid") {
      const total = formData.quotation
        .reduce((acc, item) => acc + item.quantity * item.unit_price, 0)
        .toFixed(2);
      setFormData((prevData) => ({ ...prevData, payment_amount: total }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      po_number: Math.floor(Math.random() * 1000),
    };
    setFormData(updatedFormData);

    // Retrieve existing purchase orders
    const existingPurchaseOrder =
      JSON.parse(localStorage.getItem(`${headerTitle}-purchase_order`)) || [];
    const updatedPurchaseOrders = [...existingPurchaseOrder, updatedFormData];
    localStorage.setItem(
      `${headerTitle}-purchase_order`,
      JSON.stringify(updatedPurchaseOrders)
    );

    // Retrieve existing project summaries
    const existingProjectSummaries =
      JSON.parse(localStorage.getItem(`${headerTitle}-ProjectSummary`)) || [];

    // Find and replace the project summary if it exists, otherwise add a new one
    const updatedProjectSummaries = singleQuotation.filter(
      (summary) => summary.project_name !== updatedFormData.project_name
    );
    const projectSummary = [
      ...existingProjectSummaries,
      ...updatedProjectSummaries,
      updatedFormData,
    ];

    // Save updatedproject summaries
    localStorage.setItem(`${headerTitle}-ProjectSummary`, JSON.stringify(projectSummary));

    setSelectedProject("")
  };

  // console.log(formData);
  return (
    <div>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="payment-status-button"
          onClick={() => setPage("Purchase Entry")}
          style={{
            backgroundColor: page === "Purchase Entry" ? "blue" : "red",
          }}
        >
          Purchase Entry
        </button>
        <button
          className="payment-status-button"
          onClick={() => setPage("Purchase Detail")}
          style={{
            backgroundColor: page === "Purchase Detail" ? "blue" : "red",
          }}
        >
          Purchase Detail
        </button>
      </div>
      {page === "Purchase Entry" ? (
        <div className="quotation-form-div">
          <div className="d-flex flex-column mb-2">
            <label className="quotation-input-label">Select Project</label>
            <select
              className="quotation-input-div"
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="">Select Project</option>
              {projectSelect?.length > 0 ? (
                projectSelect.map((quotation, qIndex) => (
                  <option key={qIndex} value={quotation.project_name}>
                    {quotation.project_name}
                  </option>
                ))
              ) : (
                <option>No Projects Found</option>
              )}
            </select>
          </div>
          {selectedQuotation && selectedQuotation.quotation.length > 0 && (
            <div>
              <div className="d-flex flex-column mb-2 progress-update-clients-div">
                <div>
                  <span className="progress-update-span">Client Name:</span>{" "}
                  {selectedQuotation.client_name}
                </div>
                <div>
                  <span className="progress-update-span">Company_name:</span>{" "}
                  {selectedQuotation.company_name}
                </div>
                <div>
                  <span className="progress-update-span">Address: </span>
                  {selectedQuotation.address}
                </div>
                <div>
                  <span className="progress-update-span">email:</span>{" "}
                  {selectedQuotation.email}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <strong className="payment-purchase-text">
                  Purchase Order
                </strong>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">Job No</label>
                      <input
                        className="quotation-input-div mb-2"
                        type="number"
                        name="job_no"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">PO Date</label>
                      <input
                        className="quotation-input-div mb-2"
                        type="Date"
                        name="po_date"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">
                        Payment Terms
                      </label>
                      <input
                        className="quotation-input-div mb-2"
                        type="text"
                        name="payment_terms"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">
                        Buyer Contact
                      </label>
                      <input
                        className="quotation-input-div mb-2"
                        type="text"
                        name="buyer_contact"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">
                        Vendor Ref No
                      </label>
                      <input
                        className="quotation-input-div mb-2"
                        type="text"
                        name="vendor_ref_no"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">PR/MTO NO</label>
                      <input
                        className="quotation-input-div mb-2"
                        type="text"
                        name="pr_mto_no"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">
                        PR/MTO Date
                      </label>
                      <input
                        className="quotation-input-div mb-2"
                        type="Date"
                        name="pr_mto_date"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">
                        Delivery Terms
                      </label>
                      <input
                        className="quotation-input-div mb-2"
                        type="text"
                        name="delivery_terms"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">
                        Delivery Date
                      </label>
                      <input
                        className="quotation-input-div mb-2"
                        type="Date"
                        name="delivery_date"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">Initiator</label>
                      <input
                        className="quotation-input-div mb-2"
                        type="text"
                        name="initiator"
                        onChange={handleFormInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="d-flex flex-column">
                      <label className="quotation-input-label">Payment</label>
                      <select
                        className="quotation-input-div mb-2"
                        name="payment_Status"
                        onChange={handleFormInputChange}
                      >
                        <option vlaue="">Select Payment Status</option>
                        <option>Paid</option>
                        <option>Half Paid</option>
                        <option>Pending</option>
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    {formData.payment_Status === "Half Paid" && (
                      <div className="d-flex flex-column">
                        <label className="quotation-input-label">
                          Enter Amount
                        </label>
                        <input
                          className="quotation-input-div mb-2"
                          type="number"
                          name="payment_amount"
                          onChange={handleFormInputChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {formData.quotation.map((quotation, qIndex) => (
                    <div key={qIndex}>
                      <div className="row">
                        <div className="d-flex mt-2">
                          <strong>Item{qIndex + 1}</strong>
                        </div>
                        <div className="col">
                          <div className="d-flex flex-column">
                            <lable className="quotation-input-label">
                              Description
                            </lable>
                            <input
                              className="quotation-input-div mb-2"
                              value={formData.quotation[qIndex]?.description}
                              onChange={(e) =>
                                handleInputChange(
                                  qIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                            ></input>
                          </div>
                        </div>
                        <div className="col">
                          <div className="d-flex flex-column">
                            <label className="quotation-input-label">
                              Quantity
                            </label>
                            <input
                              className="quotation-input-div mb-2"
                              value={formData.quotation[qIndex]?.quantity}
                              onChange={(e) =>
                                handleInputChange(
                                  qIndex,
                                  "quantity",
                                  e.target.value
                                )
                              }
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="d-flex flex-column">
                            <lable className="quotation-input-label">Uom</lable>
                            <input
                              className="quotation-input-div mb-2"
                              value={formData.quotation[qIndex]?.UOM}
                              onChange={(e) =>
                                handleInputChange(qIndex, "UOM", e.target.value)
                              }
                            ></input>
                          </div>
                        </div>
                        <div className="col">
                          <div className="d-flex flex-column">
                            <label className="quotation-input-label">
                              Unit Price
                            </label>
                            <input
                              className="quotation-input-div mb-2"
                              value={formData.quotation[qIndex]?.unit_price}
                              onChange={(e) =>
                                handleInputChange(
                                  qIndex,
                                  "unit_price",
                                  e.target.value
                                )
                              }
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="d-flex flex-column">
                            <label className="quotation-input-label">
                              Work Percentage
                            </label>
                            <input
                              type="number"
                              className="quotation-input-div mb-2"
                              value={formData.quotation[qIndex]?.work_percent}
                              onChange={(e) =>
                                handleInputChange(
                                  qIndex,
                                  "work_percent",
                                  e.target.value
                                )
                              }
                            ></input>
                          </div>
                        </div>
                        <div className="col"></div>
                      </div>
                      <button
                        className="quotation-add-quotation-button"
                        onClick={() => handleDeleteItem(qIndex)}
                        type="button"
                      >
                        Delete Item
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="payment-submit-button">
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      ) : (
        <PurchaseDetail></PurchaseDetail>
      )}
    </div>
  );
};

export default PaymentStatus;
