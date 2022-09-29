import React from 'react';

function Contact() {
    return ( 
        <section className="form bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10 col-md-9">
                            <div>
                                <form>
                                    <div className="mb-3">
                                      <label for="exampleInputEmail1" className="form-label">Your Name <span className="grey">(required)</span></label>
                                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Your Email <span className="grey">(required)</span></label>
                                      <input type="password" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Your Website </label>
                                      <input type="password" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">Your Message <span className="grey">(required)</span> </label>
                                        <textarea className="form-control resize" placeholder="" id="floatingTextarea"></textarea>
                                    </div>
                                    <div className="submit-buttons">
                                        <ul>
                                       <li>
                                        <a href="/">Clear Message</a>
                                       </li>
                                        <li>
                                        <a href="/">Send Message</a>
                                        </li>
                                        </ul>
                                    </div>
                                   
                                  </form>
                            </div>

                        </div>
                        <div className="col-sm-10 col-md-3">
                            <div className="little-about-div">
                                <h6>Little About Our Comapny</h6>
                                <p>Lorem ipsum dolor sit amet, consecteter vet 
                                adipiscing elit , sed diam nonummy nibh ase
                                euin mod tincidunt ut laoreet dolore mati
                                magna aliquam <span className="colorSpan">erat volutpat.</span> Iam nonunum
                                mmy nibh euin mod tincidunt ut laoreet.
                                Lorem ipsum dolor sit amet, consecteter vet 
                                adipiscing elit , sed diam nonummy nibh ase
                                euin mod tincidunt ut laoreet dolore mati
                                magna aliquam <span className="colorSpan">erat volutpat.</span> Iam nonunum
                                mmy nibh euin mod tincidunt ut laoreet.</p>
                            </div>
                                <div className="container-lg justify-content-lg-start">
                                    <div className="row justify-content-lg-center">
                                        <div className="col-sm-12 col-md-12">
                                            <div className="little-about-icons">
                                                    <div className="icons-display">
                                                        <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
                                                        <a href="/"><span>Address:</span><small> Celovska cesta 1,Ljub</small>
                                                        </a>
                                                    </div>
                                                     <div className="icons-display">
                                                        <div className="icon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                                                       
                                                        <a href="/"><span>Email:</span> <small>info@premiumcoding.com</small></a>
                                                     </div>
                                                     <div className="icons-display">
                                                        <div className="icon"><i className="fa fa-mobile" aria-hidden="true"></i></div>
                                                        <a href="/"><span>Phone Number:</span> <small>+456 789 854</small></a>
                                                     </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

            </section>
     );
}

export default Contact;