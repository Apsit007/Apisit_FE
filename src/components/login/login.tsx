import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.scss'


function login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<VisitorInfo>>({});
    const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>({
        VisitorName: '',
        OrganizationName: '',
        Email: ''
    });
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitorInfo),
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVisitorInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors: Partial<VisitorInfo> = {};
        if (!visitorInfo.VisitorName.trim()) {
            validationErrors.VisitorName = 'Visitor Name is required';
        }
        if (!visitorInfo.OrganizationName.trim()) {
            validationErrors.OrganizationName = 'Organization Name is required';
        }
        if (!visitorInfo.Email.trim()) {
            validationErrors.Email = 'Email is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return
        } else {
            const storedDataString = localStorage.getItem('AccessToken');
            if (storedDataString) {
                navigate('/dashboard');
            } else {
                fetch(import.meta.env.VITE_API_URL + 'visitors/SaveVisitor', requestOptions)
                    .then(response => response.json())
                    .then((responseData: any) => {
                        localStorage.setItem('AccessToken', JSON.stringify(responseData));
                        navigate('/dashboard');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        }
    }

    return (
        <div className="">
            <div className="position-absolute top-50 start-50 translate-middle w-75 d-flex justify-content-center">

                <div className="card" style={{ maxWidth: '500px', minHeight: '420px', minWidth: '350px', height: 'auto' }}>
                    <div className="card-body">
                        <h5 className="card-title mb-4">Visitor</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="visitorName" className="form-label">Visitor Name</label>
                                <input type="text" className={`form-control input-bg ${errors.VisitorName && 'is-invalid'}`} id="visitorName" name="VisitorName" value={visitorInfo.VisitorName} onChange={handleInputChange} />
                                {errors.VisitorName && <div className="invalid-feedback">{errors.VisitorName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="organizationName" className="form-label">Company Name</label>
                                <input type="text" className={`form-control input-bg ${errors.OrganizationName && 'is-invalid'}`} id="organizationName" name="OrganizationName" value={visitorInfo.OrganizationName} onChange={handleInputChange} />
                                {errors.OrganizationName && <div className="invalid-feedback">{errors.OrganizationName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className={`form-control input-bg ${errors.Email && 'is-invalid'}`} id="email" name="Email" value={visitorInfo.Email} onChange={handleInputChange} />
                                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
                            </div>
                            <div className='d-flex justify-content-center mt-5'>
                                <button type="submit" className="btn btn-outline-primary w-75" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        // <div className="d-flex justify-content-center align-items-center vh-100 mx-3" >
        //     <div className="card w-100 mx-3" style={{ maxWidth: '500px', minHeight: '420px' }}>
        //         <div className="card-body">
        //             <h5 className="card-title mb-4">Visitor</h5>
        //             <form onSubmit={handleSubmit}>
        //                 <div className="mb-3">
        //                     <label htmlFor="visitorName" className="form-label">Visitor Name</label>
        //                     <input
        //                         type="text"
        //                         className={`form-control ${errors.VisitorName && 'is-invalid'}`}
        //                         id="visitorName"
        //                         name="VisitorName"
        //                         value={visitorInfo.VisitorName}
        //                         onChange={handleInputChange}
        //                     />
        //                     {errors.VisitorName && <div className="invalid-feedback">{errors.VisitorName}</div>}
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="organizationName" className="form-label">Organization Name</label>
        //                     <input
        //                         type="text"
        //                         className={`form-control ${errors.OrganizationName && 'is-invalid'}`}
        //                         id="organizationName"
        //                         name="OrganizationName"
        //                         value={visitorInfo.OrganizationName}
        //                         onChange={handleInputChange}
        //                     />
        //                     {errors.OrganizationName && <div className="invalid-feedback">{errors.OrganizationName}</div>}
        //                 </div>
        //                 <div className="mb-3">
        //                     <label htmlFor="email" className="form-label">Email</label>
        //                     <input
        //                         type="email"
        //                         className={`form-control ${errors.Email && 'is-invalid'}`}
        //                         id="email"
        //                         name="Email"
        //                         value={visitorInfo.Email}
        //                         onChange={handleInputChange}
        //                     />
        //                     {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
        //                 </div>
        //                 <button type="submit" className="btn btn-primary w-100">Submit</button>
        //             </form>
        //         </div>
        //     </div>
        // </div>


    );
}
interface VisitorInfo {
    VisitorName: string;
    OrganizationName: string;
    Email: string;
}
export default login