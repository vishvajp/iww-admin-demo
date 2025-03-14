import React, { useState, useEffect, useContext } from "react";
import "../css/Invoice.css";
import logo from "../Assets/Images/iww logo.png";
import Table from "react-bootstrap/Table";
import DateObject from "react-date-object";
import { usePDF } from "react-to-pdf";
import { HeaderDataContext } from "../Context/HeaderContext";

const Invoice = () => {
 const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
    const { headerTitle, setHeaderTitle } = useContext(HeaderDataContext);
  const date = new DateObject();
  const { toPDF, targetRef } = usePDF({ filename: `${selectedProject}.pdf` });

   useEffect(() => {
    if (headerTitle === "Iww Group Of Companies") {
      const craQuotations =
        JSON.parse(localStorage.getItem("Cra Energy Solution-purchase_order")) || [];
      const ITQuotation =
        JSON.parse(localStorage.getItem("IT Tech-purchase_order")) || [];
      const precomQuotation =
        JSON.parse(localStorage.getItem("Precomtech-purchase_order")) || [];
      const sutanQuotation =
        JSON.parse(localStorage.getItem("PT.SUTAN & HARITZ-purchase_order")) || [];
      const purchase_order = [
        ...craQuotations,
        ...ITQuotation,
        ...precomQuotation,
        ...sutanQuotation,
      ];
      setPurchaseDetails(purchase_order);
      setSelectedProject("")
    }else {
      
      const storedQuotations =
      JSON.parse(localStorage.getItem(`${headerTitle}-purchase_order`)) || [];
    console.log(storedQuotations);
    setPurchaseDetails(storedQuotations);
    
    }
    }, [headerTitle]);

  useEffect(() => {
    if (selectedProject) {
      const foundQuotation = purchaseDetails.find(
        (quotation) => quotation.project_name === selectedProject
      );
      setSelectedQuotation(foundQuotation || null);
    } else {
      setSelectedQuotation(null);
    }
  }, [selectedProject, purchaseDetails]);

  console.log(selectedQuotation)
  return (
    <div>
     <div className="quotation-form-div">
      <div className="d-flex flex-column mb-2">
        <label>Select Project</label>
        <select
          className="quotation-input-div"
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {purchaseDetails.length > 0 ? (
            purchaseDetails.map((quotation, qIndex) => (
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
          <div className="d-flex justify-content-end">
          <button
            className="quotation-add-quotation-button"
            onClick={() => toPDF()}
          >
            
            Download Invoice{" "}
          </button>
          </div>
          <div className="invoice-invoice-form-div" ref={targetRef}>
            <div className="inovice-border-div">
            <div className="d-flex justify-content-center mb-4 mt-2">
              <img src={logo} style={{width:"20%"}}></img>
            </div>
            <div className="row">
              <div className="col ps-4">
                <div className="d-flex flex-column">
                  <h2 className="invoice-quotation-heading">Quotation</h2>
                  <h5>PT. IWW CRA Energy Solutions</h5>
                  <span>
                    Kav.17, Jl. Kw. Industri Sekupang, Sungai Harapan, Kec.
                    Sekupang, Batam, Kepulauan Riau, Indonesia.
                  </span>
                  <p className="mb-0">Phone: +62 778 8017749 / Fax: +62 778 8017750</p>
                  <p>
                    Website: www.cracladding.com / Email: sales@cracladding.com
                  </p>
                </div>
                <div className="d-flex flex-column">
                  <h5 className="invoice-quotation-heading">CUSTOMER</h5>
                  <p>{selectedQuotation.client_name}</p>
                  <h5 className="mb-0">{selectedQuotation.company_name}</h5>
                  <p className="mb-0"> {selectedQuotation.address}</p>
                  <p className="mb-0">TRN 100465468635668</p>
                  <p>Contact : {selectedQuotation.email}</p>
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">DATE</span>
                  </div>
                  <div className="col">
                    <span>{date.format("DD/MM/YYYY")}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">
                      QUOTATION NO
                    </span>
                  </div>
                  <div className="col">
                    <span>{`CFHGL${Math.floor(Math.random() * 100000)}`}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">VALIDITY</span>
                  </div>
                  <div className="col">
                    <span>14 days</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">
                      PAYMENT TERMS
                    </span>
                  </div>
                  <div className="col">
                    <span>{selectedQuotation.payment_terms}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">DELIVERY</span>
                  </div>
                  <div className="col">
                    <span>8 days</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">
                      DELIVERY TERMS
                    </span>
                  </div>
                  <div className="col">
                    <span>{selectedQuotation.delivery_terms}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <span className="d-flex justify-content-end">CURRENCY</span>
                  </div>
                  <div className="col">
                    <span>{selectedQuotation.currency}</span>
                  </div>
                </div>
              </div>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  {Object.keys(selectedQuotation.quotation[0]).map(
                    (key, index) => (
                      <th className="progress-table-header-div" key={index}>
                        {key.replace(/_/g, " ").toUpperCase()}
                        {index <
                          Object.keys(selectedQuotation.quotation[0])
                            .length && (
                          <div className="progress-table-empty-div"></div>
                        )}
                      </th>
                    )
                  )}
                  <th className="progress-table-header-div">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedQuotation.quotation?.map((element, rowIndex) => {
                  return (
                    <tr
                      className="patienttable-body-row-container"
                      key={rowIndex}
                    >
                      {Object.keys(element).map((rowData, cellIndex) => {
                        return (
                          <td
                            className="progress-table-body-div"
                            key={cellIndex}
                          >
                            {element[rowData]}
                            {cellIndex < Object.keys(element).length && (
                              <div className="progress-table-empty-div"></div>
                            )}
                          </td>
                        );
                      })}
                      <td className="progress-table-body-div">
                        {element["quantity"] * element["unit_price"]}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td
                    colSpan={
                      Object.keys(selectedQuotation.quotation[0]).length - 1
                    }
        className="invoice-col-span-body-div"
                  >
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td className="progress-table-body-div">
                    <strong>Subtotal</strong>
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td>
                    $
                    {selectedQuotation.quotation
                      .reduce(
                        (acc, item) => acc + item.quantity * item.unit_price,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={
                      Object.keys(selectedQuotation.quotation[0]).length - 1
                    }
                    className="invoice-col-span-body-div"
                  >
                    {" "}
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td className="progress-table-body-div">
                    <strong>Tax </strong>
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td>$-</td>
                </tr>
                <tr>
                  <td
                    colSpan={
                      Object.keys(selectedQuotation.quotation[0]).length - 1
                    }
                    className="invoice-col-span-body-div"
                  >
                    {" "}
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td className="progress-table-body-div">
                    <strong>Shipping</strong>
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td>$-</td>
                </tr>
                <tr>
                  <td
                    colSpan={
                      Object.keys(selectedQuotation.quotation[0]).length - 1
                    }
                    className="invoice-col-span-body-div"
                  >
                    {" "}
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td className="progress-table-body-div">
                    <strong>Discount</strong>
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td>-${selectedQuotation.discount || 0}</td>
                </tr>
                <tr>
                    <td
                      colSpan={
                        Object.keys(selectedQuotation.quotation[0]).length - 1
                      }
                      className="invoice-col-span-body-div"
                    >
                      {" "}
                      <div className="progress-table-empty-div"></div>
                    </td>
                    <td className="progress-table-body-div">
                      <strong>Paid</strong>
                      <div className="progress-table-empty-div"></div>
                    </td>
                    <td> ${selectedQuotation.payment_amount || 0}</td>
                  </tr>
                <tr>
                  <td
                    colSpan={
                      Object.keys(selectedQuotation.quotation[0]).length - 1
                    }
                    className="invoice-col-span-body-div"
                  >
                    {" "}
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td className="progress-table-body-div">
                    <strong>TOTAL</strong>
                    <div className="progress-table-empty-div"></div>
                  </td>
                  <td>
                      $
                      {(
                        selectedQuotation.quotation.reduce(
                          (acc, item) =>
                            acc +
                            item.quantity * item.unit_price 
                            ,
                          0
                        ) - (selectedQuotation.discount || 0) - (selectedQuotation.payment_amount )
                      ).toFixed(2)}
                    </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex justify-content-center">
              <div className="invoice-tandc-div mb-3">
                <strong className="invoice-strong-tandc">TERMS AND CONDITION</strong>
                <p>1) If any changes to the requirement may subject to cost variation</p>
              </div>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center">
              <span>
                If you have any questions about this price quote, please contact
              </span>
              <span>
                S. Karthikraja / karthikraja@cracladding.com or M. Kandeepan /
                kandy@cracladding.com / +628117751044
              </span>
              <i>
                <strong>Thank You For Your Valuable Enquiry!</strong>
              </i>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Invoice;
