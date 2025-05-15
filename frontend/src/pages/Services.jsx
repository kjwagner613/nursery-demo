import React from 'react';
import "../index.css";
import ReactDOM from 'react-dom/client';
import planting1 from "../assets/images/planting1.jpg";
import landscape2 from "../assets/images/landscape2.jpg";




const Services = () => {
  return (
    <>     
   <div className="grid grid-cols-3 gap-4">
  <div className="flex flex-col justify-center items-center">
    <img src={planting1} alt="First Image" className="w-full h-auto rounded-lg" />
    <div className="service-item mt-4">
      <h3 className="text-gray-700 text-2xl" style={{ fontFamily: "Playfair Display" }}>
        Planting
      </h3>
      <p className="text-gray-700 text-lg">
        Our experienced team will expertly plant trees and shrubs sourced directly from our nursery. With over 1000 trees planted in recent years, we guarantee a high-quality planting service. We provide staking for trees requiring support and can also install protective netting to deter deer, if needed. Our pricing is based on time and materials.
      </p>
    </div>
  </div>
  <div className="flex flex-col justify-center items-center">
    <div className="service-item">    
            <h3 className="text-gray-700 text-2xl my-3" style={{ fontFamily: "Playfair Display" }}>
        Landscaping and Maintenance
      </h3>
      <p className="text-gray-700 text-lg mt- my-3">
        Our comprehensive landscape maintenance program encompasses weekly mowing and bi-weekly maintenance visits, ensuring your property remains vibrant and well-groomed year-round. To optimize our service and scheduling efficiency, we focus on providing full-service monthly contracts. While we typically do not offer one-time mowing or cleanup services, we may make exceptions during the early spring and late fall seasons to accommodate specific client needs. This approach allows us to provide the most effective and consistent care for your landscape. Our dedicated team is committed to maintaining the pristine condition of your outdoor space, providing you with the peace of mind that comes with professional, reliable landscape management.
      </p>
    </div>
  </div>
  <div className="flex flex-col justify-center items-center">
                <h3 className="text-gray-700 text-2xl my-1" style={{ fontFamily: "Playfair Display" }}>
        Irrigation
      </h3>
    <div className="service-item mt-8">
      <p className="text-gray-700 text-lg">
        Want a vibrant, healthy landscape? A great irrigation system is the key! Give us a call, and let's discuss how we can help your plants flourish. I hope these options are helpful! Let me know if you'd like any further revisions.
      </p><img src={landscape2} alt="Second Image" className="w-full h-auto rounded-lg my-10" />
    </div>
  </div>
</div>   </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Services />);

export default Services;





















  // <div style={{ display: "flex", flexDirection: "column", textAlign: "justify", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
  //   <div><h1 className="text-4xl font-bold text-center text-blue-600">Services</h1>
  //   <img className="planting1" src={planting1} alt="planting1" />
  //     <h3>Planting</h3>
  //     <p>Our experienced team will expertly plant trees and shrubs sourced directly from our nursery. With over 1000 trees planted in recent years, we guarantee a high-quality planting service. We provide staking for trees requiring support and can also install protective netting to deter deer, if needed. Our pricing is based on time and materials.</p>
  //   </div>
  //   <div>
  //      <img className="landscape2" src={landscape2} alt="landscape2" />
  //     <h2>Landscape and Maintenance</h2>
  //     <p>Our comprehensive landscape maintenance program encompasses weekly mowing and bi-weekly maintenance visits, ensuring your property remains vibrant and well-groomed year-round. To optimize our service and scheduling efficiency, we focus on providing full-service monthly contracts. While we typically do not offer one-time mowing or cleanup services, we may make exceptions during the early spring and late fall seasons to accommodate specific client needs. This approach allows us to provide the most effective and consistent care for your landscape. Our dedicated team is committed to maintaining the pristine condition of your outdoor space, providing you with the peace of mind that comes with professional, reliable landscape management.</p>
  //   </div>
  //   <div>
  //     <h2>Irrrigation Intallatiom</h2>
  //     <p>Want a vibrant, healthy landscape? A great irrigation system is the key! Give us a call, and let's discuss how we can help your plants flourish." I hope these options are helpful! Let me know if you'd like any further revisions.</p>
  //   </div>
  // </div>


