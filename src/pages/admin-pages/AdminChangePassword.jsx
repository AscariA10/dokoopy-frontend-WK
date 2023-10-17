import { EditEyeOpened } from "../../assets/admin-icons/edit-password-eye-o";
import { EditEyeClosed } from "../../assets/admin-icons/edit-password-eye-c";
import { useState, useEffect } from "react";
import { AdminApi } from "../../api/api";
import { useLoadingData } from "../../hook/useLoadingData";
import { useNavigate } from "react-router-dom";

export const AdminChangePassword = () => {
   const [currentPassword, setCurrentPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [typeCurrentPassword, setTypeCurrentPassword] = useState("password");
   const [typeNewPassword, setTypeNewPassword] = useState("password");
   const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
   const [passwordMismatch, setPasswordMismatch] = useState(false);
   const [showErrorMessage, setShowErrorMessage] = useState(false);
   const [showErrorMessage2, setShowErrorMessage2] = useState(false);
   const [showErrorMessage3, setShowErrorMessage3] = useState(false);
   const [showErrorMessage4, setShowErrorMessage4] = useState(false);
   const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] = useState(false);
   const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
   const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);

   const navigate = useNavigate();
   const [newInputStyles, setNewInputStyles] = useState({
      border: '1px solid var(--inputs_color, #ACACAC)',
    });
    const [confirmInputStyles, setConfirmInputStyles] = useState({
      border: '1px solid var(--inputs_color, #ACACAC)',
      });
    const [currentInputStyles, setCurrentInputStyles] = useState({
      border: '1px solid var(--inputs_color, #ACACAC)',
    });
   const { data, isLoading, error, eventLoading } = useLoadingData(AdminApi.changePasswordAdmin, true);
   const handleChange = (event) => {
         setCurrentPassword(event.target.value);
    };

    useEffect(() => {
      if (showErrorMessage) {
        setNewInputStyles({
          border: '1px solid red',
        });
        setConfirmInputStyles({
          border: '1px solid red',
        });
        const timer = setTimeout(() => {
          setShowErrorMessage(false);
          setNewInputStyles({
            border: '1px solid var(--inputs_color, #ACACAC)',
          });
          setConfirmInputStyles({
            border: '1px solid var(--inputs_color, #ACACAC)',
          });
          setShowErrorMessage(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }
    }, [showErrorMessage]);

   useEffect(() => {
      if (showErrorMessage2) {
         setCurrentInputStyles({
            border: '1px solid red',
          });
         setNewInputStyles({
           border: '1px solid red',
         });
         setConfirmInputStyles({
           border: '1px solid red',
         });
         const timer = setTimeout(() => {
           setShowErrorMessage2(false);
           setCurrentInputStyles({
            border: '1px solid var(--inputs_color, #ACACAC)',
          });
           setNewInputStyles({
             border: '1px solid var(--inputs_color, #ACACAC)',
           });
           setConfirmInputStyles({
             border: '1px solid var(--inputs_color, #ACACAC)',
           });
           setShowErrorMessage2(false);
         }, 3000);

         return () => clearTimeout(timer);
      }
   }, [showErrorMessage2]); 

   useEffect(() => {
      if (showErrorMessage3) {
         setCurrentInputStyles({
            border: '1px solid red',
          });
         const timer = setTimeout(() => {
           setShowErrorMessage3(false);
           setCurrentInputStyles({
            border: '1px solid var(--inputs_color, #ACACAC)',
          });
           setShowErrorMessage4(false);
         }, 3000);

         return () => clearTimeout(timer);
      }
   }, [showErrorMessage3]); 

   useEffect(() => {
      if (showErrorMessage4) {
         setNewInputStyles({
            border: '1px solid red',
          });
         const timer = setTimeout(() => {
           setShowErrorMessage4(false);
           setNewInputStyles({
            border: '1px solid red',
          });
           setShowErrorMessage4(false);
         }, 3000);

         return () => clearTimeout(timer);
      }
         
   }, [showErrorMessage4]);


   const toggleVisibility = (passwordType) => {
      if (passwordType === "current") {
        setIsVisibleCurrentPassword(!isVisibleCurrentPassword);
        setTypeCurrentPassword(typeCurrentPassword === "password" ? "text" : "password");
      } else if (passwordType === "new") {
        setIsVisibleNewPassword(!isVisibleNewPassword);
        setTypeNewPassword(typeNewPassword === "password" ? "text" : "password");
      } else if (passwordType === "confirm") {
        setIsVisibleConfirmPassword(!isVisibleConfirmPassword);
        setTypeConfirmPassword(typeConfirmPassword === "password" ? "text" : "password");
      }
    };

   function editPassword(event) {
      event.preventDefault();

      if (currentPassword.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
         setShowErrorMessage2(true);
         return;
      }
         
      if (newPassword.length < 6 || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword) || /\s/.test(newPassword)) {
         setShowErrorMessage4(true);
            return;
          }

      if (newPassword === confirmPassword) {
         setPasswordMismatch(false);
         const body = {
            password: currentPassword,
            newPassword: newPassword,
         };
         eventLoading(body);
         if (error) {
            const responseStatus = error.response.status;
            console.log(error)
            if (responseStatus === 200) {
               setCurrentPassword("");
               setNewPassword("");
               setConfirmPassword("");
               navigate("/login/successful-renew");
            } else {
               setShowErrorMessage3(true);
         return;
            }
          }
      } else {
         setPasswordMismatch(true);
         setShowErrorMessage(true);
         setNewPassword("");
         setConfirmPassword("");
      }
      }

   return (
      <div className="admin-change-password">
         <div className="header-admin-change-password">
            <h2>Зміна паролю</h2>
         </div>
         <div className="inputs-admin-change-password">
            <form onSubmit={editPassword} className="admin-change-form">
               <div className="all-input-change">
               <label className="this-admin-change-password">
                  <p>Поточний пароль*</p>
                  <div className="this-admin-change-password-input" style={currentInputStyles}>
                  <input
                        type={typeCurrentPassword}
                        value={currentPassword}
                        onChange={handleChange}
                        placeholder="************"
                        />
                  {isVisibleCurrentPassword ? (
                        <EditEyeClosed onClick={() => toggleVisibility("current")} />
                        ) : (
                        <EditEyeOpened onClick={() => toggleVisibility("current")} />
                        )}
                  </div>
               </label>
               <label className="new-admin-change-password">
                  <p>Новий пароль*</p>
                  <div className="new-admin-change-password-input" style={newInputStyles}>
                  <input
                     type={typeNewPassword}
                     value={newPassword}
                     onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordMismatch(false); 
                     }}
                     placeholder="************"
                  />
                  {isVisibleNewPassword ? (
                     <EditEyeClosed onClick={() => toggleVisibility("new")} />
                     ) : (
                        <EditEyeOpened onClick={() => toggleVisibility("new")} />
                     )}
               </div>
               </label>
               <label className="return-admin-change-password">
                  <p>Повторити новий пароль*</p>
                  <div className="return-admin-change-password-input" style={confirmInputStyles}>
                  <input
                     type={typeConfirmPassword}
                     value={confirmPassword}
                     onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMismatch(false); 
                     }}
                     placeholder="************"
                  />
                  {isVisibleConfirmPassword ? (
                     <EditEyeClosed onClick={() => toggleVisibility("confirm")} />
                        ) : (
                     <EditEyeOpened onClick={() => toggleVisibility("confirm")} />
                        )}
                  </div>
                  {showErrorMessage && (
                     <p className="error-icon-message" style={{ color: 'red' }}>Нові паролі не співпадають</p>
                  )}
                  {showErrorMessage2 && (
                     <p className="error-icon-message" style={{ color: 'red' }}>Незаповнене поле</p>
                  )}
                  {showErrorMessage3 && (
                     <p className="error-icon-message" style={{ color: 'red' }}>Пароль не співпада</p>
                  )}
                  {showErrorMessage4 && (
                     <p className="error-icon-message" style={{ color: 'red' }}>Пароль не відповідає вимогам</p>
                  )}
               </label>
               </div>
               <button className="edit-password-btn" type="submit">Змінити пароль</button>
            </form>
         </div>
      </div>
   );
};