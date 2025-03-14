import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { HeaderDataContext } from "../Context/HeaderContext";


const PurchaseDetail = () => {
  const [purchaseDetails, setPurchaseDetails] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
     const {
          headerTitle,
          setHeaderTitle,
        } = useContext(HeaderDataContext);

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
      const purchaseOrder = [
        ...craQuotations,
        ...ITQuotation,
        ...precomQuotation,
        ...sutanQuotation,
      ];
      setPurchaseDetails(purchaseOrder);
    }else{
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

  return (
    <div>
      <h2>Purchase Detail</h2>
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
        <div>
          {selectedQuotation && selectedQuotation.quotation.length > 0 && (
            <div>
              <div className="d-flex flex-column mb-2 progress-update-clients-div ">
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
                  <span className="progress-update-span">Email:</span>{" "}
                  {selectedQuotation.email}
                </div>
                <div>
                  <span className="progress-update-span">Currency:</span>{" "}
                  {selectedQuotation.currency}
                </div>
              </div>
              <div className="row progress-update-clients-div mb-3">
                <div className="col">
                  <div>
                    <span className="progress-update-span">Job No:</span>{" "}
                    {selectedQuotation.job_no}
                  </div>
                  <div>
                    <span className="progress-update-span">Po Date:</span>{" "}
                    {selectedQuotation.po_date}
                  </div>
                  <div>
                    <span className="progress-update-span">Payment Terms:</span>{" "}
                    {selectedQuotation.payment_terms}
                  </div>
                  <div>
                    <span className="progress-update-span">Buyer Contact:</span>{" "}
                    {selectedQuotation.buyer_contact}
                  </div>
                  <div>
                    <span className="progress-update-span">Vendor Ref No:</span>{" "}
                    {selectedQuotation.vendor_ref_no}
                  </div>
                  <div>
                    <span className="progress-update-span">Pr Mto No:</span>{" "}
                    {selectedQuotation.pr_mto_no}
                  </div>
                  <div>
                    <span className="progress-update-span">Pr Mto Date:</span>{" "}
                    {selectedQuotation.pr_mto_date}
                  </div>
                </div>
                <div className="col">
                <div>
                    <span className="progress-update-span">
                     Po Number:
                    </span>{" "}
                    {selectedQuotation.po_number}
                  </div>
                  <div>
                    <span className="progress-update-span">
                      Delivery Terms:
                    </span>{" "}
                    {selectedQuotation.delivery_terms}
                  </div>
                  <div>
                    <span className="progress-update-span">Delivery Date:</span>{" "}
                    {selectedQuotation.delivery_date}
                  </div>
                  <div>
                    <span className="progress-update-span">Initiator:</span>{" "}
                    {selectedQuotation.initiator}
                  </div>
                  {/* <div>
                    <span className="progress-update-span">
                      Payment Detail:
                    </span>{" "}
                    {selectedQuotation.payment_detail}
                  </div> */}
                  <div>
                    <span className="progress-update-span">
                      Payment Amount:
                    </span>{" "}
                    {selectedQuotation.payment_amount}
                  </div>
                  <div>
                    <span className="progress-update-span">Payment Status :</span>{" "}
                    {selectedQuotation.payment_Status}
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
                    <td>$0</td>
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
                    <td>$0</td>
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
                    <td>${selectedQuotation.discount || 0}</td>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetail;
