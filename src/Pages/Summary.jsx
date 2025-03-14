import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/SummaryPage.css";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Modal, Button, Form } from "react-bootstrap";
import { HeaderDataContext } from "../Context/HeaderContext";

// import { format } from 'date-fns';

const Summary = () => {
  const navigate = useNavigate();
  const [pageSummaryValue, setPageSummaryValue] = useState(null);
  const { headerTitle, setHeaderTitle } = useContext(HeaderDataContext);
  const [company, setCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [projectProgress, setProjectProgress] = useState({});
  const [pagination, setPagination] = useState({
    current: 1, // Default current page
    pageSize: 10, // Default page size
  });
  const [pageSummary, setPageSummary] = useState(null);
  const [status, setStatus] = useState("Not Started");
  const [statusColor, setStatusColor] = useState("Not Started");
  const [rowStatus, setRowStatus] = useState({});
  const tableRef = useRef(null);
  // Remarks state
  const [remarkValue, setRemarkValue] = useState("");
  const [currentElement, setCurrentElement] = useState(null);
  const [fileteredElement, setFileteredElement] = useState(null);
  const [elementIndex, setElementIndex] = useState(null);
  const [openRow, setOpenRow] = useState(false);
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [remarks, setRemarks] = useState("");

  const onChange = (pageNumber, pageSize) => {
    setPagination({ current: pageNumber, pageSize }); // Update state
    console.log("Page:", pageNumber, "Page Size:", pageSize);
  };

  useEffect(() => {
    if (headerTitle === "Iww Group Of Companies") {
      const craPurchaseOrder =
        JSON.parse(
          localStorage.getItem("Cra Energy Solution-purchase_order")
        ) || [];
      const ITPurchaseOrder =
        JSON.parse(localStorage.getItem("IT Tech-purchase_order")) || [];
      const precomPurchaseOrder =
        JSON.parse(localStorage.getItem("Precomtech-purchase_order")) || [];
      const sutanPurchaseOrder =
        JSON.parse(localStorage.getItem("PT.SUTAN & HARITZ-purchase_order")) ||
        [];
      const totalPurchase = [
        ...craPurchaseOrder,
        ...ITPurchaseOrder,
        ...precomPurchaseOrder,
        ...sutanPurchaseOrder,
      ];

      const craQuotations =
        JSON.parse(localStorage.getItem("Cra Energy Solution-quotation")) || [];
      const ITQuotation =
        JSON.parse(localStorage.getItem("IT Tech-quotation")) || [];
      const precomQuotation =
        JSON.parse(localStorage.getItem("Precomtech-quotation")) || [];
      const sutanQuotation =
        JSON.parse(localStorage.getItem("PT.SUTAN & HARITZ-quotation")) || [];
      const totalQuotation = [
        ...craQuotations,
        ...ITQuotation,
        ...precomQuotation,
        ...sutanQuotation,
      ];

      if (totalQuotation && totalQuotation.length > 0) {
        const mainPurchase = totalQuotation.filter(
          (quota) =>
            !totalPurchase.some(
              (purchase) => purchase.project_name === quota.project_name
            )
        );

        const totalSummaries = [...totalPurchase, ...mainPurchase];
        setPageSummary(totalSummaries);
      } else {
        // Reset if no data is found
        setPageSummary([]);
      }
    } else {
      const singleQuotation = JSON.parse(
        localStorage.getItem(`${headerTitle}-quotation`)
      );
      if (singleQuotation && singleQuotation.length > 0) {
        const existingPurchaseOrder =
          JSON.parse(localStorage.getItem(`${headerTitle}-purchase_order`)) ||
          [];

        const projSelect =
          singleQuotation.filter(
            (singleQuo) =>
              !existingPurchaseOrder.some(
                (purchase) => purchase.project_name === singleQuo.project_name
              )
          ) || [];

        const updatedSummaries = [...existingPurchaseOrder, ...projSelect];
        setPageSummary(updatedSummaries);
      } else {
        // Reset if no data is found
        setPageSummary([]);
      }
    }
  }, [headerTitle]);

  // Pagenation

  useEffect(() => {
    const pageSummaryValue = pageSummary?.slice(
      (pagination.current - 1) * pagination.pageSize,
      pagination.current * pagination.pageSize
    );
    setPageSummaryValue(pageSummaryValue);
  }, [pageSummary, pagination]);

  // Filter for page

  useEffect(() => {
    if (!pageSummary) return;

    const filteredSummary = pageSummary.filter((summary) => {
      const companyName = summary.created_company
        ?.toLowerCase()
        .includes(company.toLowerCase());

      const projectStatus = summary.project_status || "Not Started";

      // Filter logic for "Started Working"
      const statusFilter =
        !selectedStatus || // Show all if no status is selected
        (selectedStatus === "Started Working"
          ? projectStatus.includes("Started Working") || // Include "Started Working"
            projectStatus.includes("%") // Include status with percentage
          : projectStatus === selectedStatus); // Exact match for other statuses

      return companyName && statusFilter;
    });

    setPageSummaryValue(filteredSummary);
  }, [company, selectedStatus, pageSummary]);

  const handleStatusChange = (newStatus, element, itemIndex, projectIndex) => {
    setCurrentItem({ newStatus, itemIndex, projectIndex });
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!currentItem) return;

    const { newStatus, itemIndex, projectIndex } = currentItem;

    setPageSummary((prevPageSummary) =>
      prevPageSummary.map((project, pIndex) => {
        if (pIndex === projectIndex) {
          const updatedQuotation = project.quotation.map((item, iIndex) => {
            if (iIndex === itemIndex) {
              return { ...item, status: newStatus, remarks: remarks }; // Update status & remarks
            }
            return item;
          });

          // Calculate total work percent
          const completedItems = updatedQuotation.filter(
            (item) => item.status === "Completed"
          );
          const totalWorkPercent = completedItems.reduce(
            (acc, item) => acc + Number(item.work_percent || 0),
            0
          );

          let projectStatus = "Not Started";
          if (updatedQuotation.some((item) => item.status === "In Progress")) {
            projectStatus = "Started Working";
          }
          if (completedItems.length > 0) {
            projectStatus = `${totalWorkPercent}% Completed`;
          }

          return {
            ...project,
            quotation: updatedQuotation,
            project_status: projectStatus,
          };
        }
        return project;
      })
    );

    setShowModal(false);
    setRemarks(""); // Reset input
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Started":
        return "gray";
      case "In Progress":
        return "rgb(67, 67, 199)";
      case "Completed":
        return "rgb(199, 36, 36)";
      default:
        return "gray";
    }
  };

  // console.log(selectedStatusFilter);

  return (
    <div>
      <div className="quotation-form-div">
        <div>
          <button
            className="Summary-Add-project-button mb-3"
            onClick={() => navigate("/quotation")}
          >
            {" "}
            +Add Project
          </button>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              total={500}
              current={pagination.current} // Controlled current page
              pageSize={pagination.pageSize}
              pageSizeOptions={["10", "20", "50", "100"]}
              onChange={onChange}
            />
          </div>
          {headerTitle === "Iww Group Of Companies" && (
            <div className="col-4">
              <div className="d-flex justify-content-center gap-2">
                <div className="d-flex ">
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
                </div>

                <div className="d-flex   ">
                  <select
                    className="summary-select-company"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Started Working">Started Working</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="col-2">
            <div className="d-flex ">
              <DownloadTableExcel
                filename="users table"
                sheet="users"
                currentTableRef={tableRef.current}
              >
                {" "}
                <button className="summary-excel-button">
                  {" "}
                  Download excel{" "}
                </button>
              </DownloadTableExcel>
            </div>
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th className="progress-table-header-div">
                S.No <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Company Name <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Project Number <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Project Name <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Owner <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                P.O Number <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Start <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                End <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Project Status <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">
                Project Remarks <div className="progress-table-empty-div"></div>
              </th>
              <th className="progress-table-header-div">Actions </th>
            </tr>
          </thead>
          <tbody>
            {pageSummaryValue && pageSummaryValue.length > 0 ? (
              pageSummaryValue.map((element, rowIndex) => {
                const deliveryDate =
                  new Date(element.delivery_date) < new Date();
                console.log(deliveryDate);

                return (
                  // Move the return statement here
                  <React.Fragment key={rowIndex}>
                    <tr
                      onClick={() => {
                        setSelectedRowIndex(rowIndex);
                        setOpenRow(!openRow);
                      }}
                      className="patienttable-body-row-container"
                    >
                      <td className="progress-table-body-div">
                        {rowIndex + 1}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {element.created_company}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {1000 + rowIndex}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {element.project_name}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {element.client_name} | {element.company_name}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {element.po_number ? element.po_number : "TBA"}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {element.po_date
                          ? element.po_date
                          : new Date().toISOString().split("T")[0]}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        {element.delivery_date
                          ? element.delivery_date
                          : new Date().toISOString().split("T")[0]}
                        <div className="progress-table-empty-div"></div>
                      </td>

                      <td
                        className="summary-page-project-div"
                        style={{
                          backgroundColor: deliveryDate ? "red" : "white",
                          color: deliveryDate ? "white" : "black",
                        }}
                      >
                        {element.project_status || "Not Started"}
                        <div className="progress-table-empty-div"></div>
                      </td>

                      <td className="progress-table-body-div">
                        {element.project_remarks
                          ? element.project_remarks
                          : "Upadate soon"}
                        <div className="progress-table-empty-div"></div>
                      </td>
                      <td className="progress-table-body-div">
                        <div className="d-flex justify-content-center">
                          <span>
                            <FaEdit className="summary-edit-icon" />
                          </span>
                        </div>
                      </td>
                    </tr>
                    {selectedRowIndex === rowIndex && openRow && (
                      <tr>
                        <td colSpan="11">
                          <Table>
                            <thead>
                              <tr>
                                <th className="progress-table-header-div">
                                  Item
                                  <div className="progress-table-empty-div"></div>
                                </th>
                                <th className="progress-table-header-div">
                                  Description
                                  <div className="progress-table-empty-div"></div>
                                </th>
                                <th className="progress-table-header-div">
                                  Quantity
                                  <div className="progress-table-empty-div"></div>
                                </th>
                                <th className="progress-table-header-div">
                                  Uom
                                  <div className="progress-table-empty-div"></div>
                                </th>
                                <th className="progress-table-header-div">
                                  Unit price
                                  <div className="progress-table-empty-div"></div>
                                </th>
                                {element.po_number && (
                                  <>
                                    <th className="progress-table-header-div">
                                      Item Status{" "}
                                      <div className="progress-table-empty-div"></div>
                                    </th>
                                    <th className="progress-table-header-div">
                                      Item remarks
                                    </th>
                                  </>
                                )}
                              </tr>
                            </thead>
                            {element.quotation?.map((singleSum, itemIndex) => (
                              <tbody key={itemIndex}>
                                <tr>
                                  <td className="progress-table-body-div">
                                    Item {itemIndex + 1}
                                    <div className="progress-table-empty-div"></div>
                                  </td>

                                  <td className="progress-table-body-div">
                                    {singleSum.description}
                                    <div className="progress-table-empty-div"></div>
                                  </td>
                                  <td className="progress-table-body-div">
                                    {singleSum.quantity}
                                    <div className="progress-table-empty-div"></div>
                                  </td>
                                  <td className="progress-table-body-div">
                                    {singleSum.UOM}
                                    <div className="progress-table-empty-div"></div>
                                  </td>
                                  <td className="progress-table-body-div">
                                    {singleSum.unit_price}
                                    <div className="progress-table-empty-div"></div>
                                  </td>
                                  {element.po_number && (
                                    <>
                                      <td className="progress-table-body-div">
                                        <select
                                          style={{
                                            backgroundColor:
                                              rowStatus[rowIndex]?.color ||
                                              "gray",
                                          }}
                                          className="summary-status-select"
                                          value={
                                            singleSum.status || "Not Started"
                                          }
                                          onChange={(e) => {
                                            const newStatus = e.target.value;
                                            handleStatusChange(
                                              newStatus,
                                              element,
                                              itemIndex,
                                              rowIndex
                                            );
                                          }}
                                        >
                                          <option value="Not Started">
                                            Not Started
                                          </option>
                                          <option value="In Progress">
                                            In Progress
                                          </option>
                                          <option value="Completed">
                                            Completed
                                          </option>
                                        </select>
                                        <div className="progress-table-empty-div"></div>
                                      </td>
                                      <td>{singleSum.remarks}</td>
                                    </>
                                  )}
                                </tr>
                              </tbody>
                            ))}
                          </Table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ); // Close the return statement properly
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {/* This is your hidden table for export */}
      <Table responsive ref={tableRef} style={{ display: "none" }}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Project Number</th>
            <th>Project Name</th>
            <th>Owner</th>
            <th>P.O Number</th>
            <th>Start</th>
            <th>End</th>
            <th>Project Status</th> {/* Only text here */}
            <th>Project Remarks</th>
          </tr>
        </thead>
        <tbody>
          {pageSummaryValue?.map((element, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              <td>{rowIndex + 1 + 1000}</td>
              <td>{element.project_name}</td>
              <td>
                {element.client_name} | {element.company_name}
              </td>
              <td>{element.po_number || "TBA"}</td>
              <td>
                {element.po_date || new Date().toISOString().split("T")[0]}
              </td>
              <td>
                {element.delivery_date ||
                  new Date().toISOString().split("T")[0]}
              </td>
              <td>{rowStatus[rowIndex]?.status || "Not Started"}</td>{" "}
              {/* Text instead of <select> */}
              <td>{element.project_remarks || "Update soon"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Remarks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Summary;
