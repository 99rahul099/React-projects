import React from "react";
import "./Businesscard.css";
import { jsPDF } from "jspdf";

function Bcard() {
  const doc = new jsPDF();
  const [data, setData] = React.useState({
    name: "",
    profile: "",
    no: "",
    email: "",
    website: "",
    address: ""
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

 

 
  const generatePDF = () => {
    doc.setFontSize(18);
    doc.text(data.name, 20, 20);
    doc.setFontSize(14);
    doc.text(data.profile, 20, 30);
    doc.text(`Phone: ${data.no}`, 20, 40);
    doc.text(`Email: ${data.email}`, 20, 50);
    doc.text(`Website: ${data.website}`, 20, 60);
    doc.text(`Address: ${data.address}`, 20, 70);
    doc.save(`${data.name}_business_card.pdf`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-4">Business Card Generator</h1>
          <p className="lead">Create your professional business card in minutes</p>
        </div>

        <div className="col-md-6">
          <div className="form-section">
            <h2 className="text-center mb-4">Business Card Details</h2>
            
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter company name"
              />
            </div>
            
            <div className="form-group">
              <label>Company Profile:</label>
              <input
                type="text"
                className="form-control"
                name="profile"
                value={data.profile}
                onChange={handleChange}
                placeholder="E.g. Web Development Company"
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                className="form-control"
                name="no"
                value={data.no}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="form-group">
              <label>Company Website:</label>
              <input
                type="url"
                className="form-control"
                name="website"
                value={data.website}
                onChange={handleChange}
                placeholder="Enter website URL"
              />
            </div>
            
            <div className="form-group">
              <label>Address:</label>
              <textarea
                className="form-control"
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="Enter company address"
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-preview">
            <h2 className="text-center mb-4">Card Preview</h2>
            
            <div className="front-side">
              <div className="color-grid">
                <div className="black"></div>
                <div className="red1"></div>
                <div className="red2"></div>
                <div className="green"></div>
              </div>
              <div className="info-grid">
                <div className="name">
                  <h2>{data.name || "Your Company"}</h2>
                  <h5>{data.profile || "Company Profile"}</h5>
                </div>
                
                <div className="addr">
                  <h5>{data.address || "Company Address"}</h5>
                </div>
                
                <div className="phoneNo">
                  <p>{data.no || "Phone Number"}</p>
                </div>
                
                <div className="emailId">
                  <p className="email">{data.email || "email@company.com"}</p>
                  <p className="web">{data.website || "www.company.com"}</p>
                </div>
              </div>
            </div>
            
            <div className="back-side">
              <div className="color-grid">
                <div className="black"></div>
                <div className="red1"></div>
                <div className="red2"></div>
                <div className="green"></div>
              </div>
              <div className="name-tag">
                <h1>{data.name || "Your Company"}</h1>
                {data.profile && <h3>{data.profile}</h3>}
              </div>
            </div>
            
            <button 
              className="btn btn-secondary download-btn"
              onClick={generatePDF}
              disabled={!data.name}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bcard;