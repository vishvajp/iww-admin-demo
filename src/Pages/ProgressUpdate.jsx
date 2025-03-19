import React, { useState, useEffect, useContext } from "react";
import Table from "react-bootstrap/Table";
import "../css/ProgressUpdate.css";

import { HeaderDataContext } from "../Context/HeaderContext";

const ProgressUpdate = () => {
  const [quotations, setQuotations] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const { headerTitle, setHeaderTitle } = useContext(HeaderDataContext);

  // Retrieve and parse data from localStorage
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
      const quotations = [
        ...craQuotations,
        ...ITQuotation,
        ...precomQuotation,
        ...sutanQuotation,
      ];
      setQuotations(quotations);
      console.log("game");
    } else {
      const storedQuotations =
        JSON.parse(localStorage.getItem(`${headerTitle}-quotation`)) || [];
      console.log(storedQuotations);
      setQuotations(storedQuotations);
    }
  }, [headerTitle]);
  // console.log(selectedProject)

  useEffect(() => {
    if (selectedProject) {
      const foundQuotation = quotations.find(
        (quotation) => quotation.project_name === selectedProject
      );
      setSelectedQuotation(foundQuotation || null);
    } else {
      setSelectedQuotation(null);
    }
  }, [selectedProject, quotations]);
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
            {quotations.length > 0 ? (
              quotations.map((quotation, qIndex) => (
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

            <Table responsive>
              <thead>
                <tr>
                  {Object.keys(selectedQuotation.quotation[0]).map(
                    (key, index) => (
                      <th className="progress-table-header-div" key={index}>
                        {key.replace(/_/g, " ").toUpperCase()}
                        {index <
                          Object.keys(selectedQuotation.quotation[0]).length -
                            1 && (
                          <div className="progress-table-empty-div"></div>
                        )}
                      </th>
                    )
                  )}
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
                            {cellIndex < Object.keys(element).length - 1 && (
                              <div className="progress-table-empty-div"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressUpdate;
