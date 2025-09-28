import React from "react";
import { Link } from "react-router-dom";
import '../stylesheets/footer.css'

const Footer=()=>{

    return(
        
        <footer class="site-footer">
            <div class="container footer-inner">
            <p>&copy; 2025 AI Tools. All rights reserved.</p>
            <ul class="footer-links">
               <li>✉️ Email : yugsudani88@gmail.com</li>
               <li>  Support : 9510502422</li>
            </ul>
            </div>
        </footer>
    )
}

export default Footer;