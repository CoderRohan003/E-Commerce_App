// import React from 'react';
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


// const Footer = () => {
//   return (
//     <footer className="bg-dark text-light py-5">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3">
//             <h5>About Us</h5>
//             <p>We are a leading e-commerce platform offering a wide range of products at the best prices.</p>
//           </div>
//           <div className="col-md-3">
//             <h5>Customer Service</h5>
//             <ul className="list-unstyled">
//               <li><a href="/help" className="text-light">Help Center</a></li>
//               <li><a href="/returns" className="text-light">Returns</a></li>
//               <li><a href="/shipping" className="text-light">Shipping Info</a></li>
//               <li><a href="/contact" className="text-light">Contact Us</a></li>
//             </ul>
//           </div>
//           <div className="col-md-3">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="/privacy" className="text-light">Privacy Policy</a></li>
//               <li><a href="/terms" className="text-light">Terms of Service</a></li>
//               <li><a href="/faq" className="text-light">FAQ</a></li>
//               <li><a href="/blog" className="text-light">Blog</a></li>
//             </ul>
//           </div>
//           <div className="col-md-3">
//             <h5>Subscribe to our Newsletter</h5>
//             <form>
//               <div className="mb-3">
//                 <input type="email" className="form-control" placeholder="Enter your email" />
//               </div>
//               <button type="submit" className="btn btn-primary">Subscribe</button>
//             </form>
//           </div>
//         </div>
//         <div className="row mt-4">
//           <div className="col-md-6">
//             <p>&copy; 2024 Your Company. All rights reserved.</p>
//           </div>
//           <div className="col-md-6 text-md-end">
//             <a href="https://facebook.com" className="text-light me-3"><FaFacebookF /></a>
//             <a href="https://twitter.com" className="text-light me-3"><FaTwitter /></a>
//             <a href="https://instagram.com" className="text-light me-3"><FaInstagram /></a>
//             <a href="https://linkedin.com" className="text-light"><FaLinkedin /></a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;





import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import '../../css/Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>We are a leading e-commerce platform offering a wide range of products at the best prices.</p>
          </div>
          <div className="col-md-3">
            {/* Customer Service section removed */}
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-style">
              <li><a href="/about" className="text-light">About</a></li>
              <li><a href="/contact" className="text-light">Contact</a></li>
              <li><a href="/policy" className="text-light">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Subscribe to our Newsletter</h5>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="https://facebook.com" className="text-light me-3"><FaFacebookF /></a>
            <a href="https://twitter.com" className="text-light me-3"><FaTwitter /></a>
            <a href="https://instagram.com" className="text-light me-3"><FaInstagram /></a>
            <a href="https://linkedin.com" className="text-light"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
