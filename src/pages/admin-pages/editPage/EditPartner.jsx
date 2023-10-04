import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { AdminApi } from "../../../api/api";
import { PageHeader } from "../../../components/admin-components/PageHeader";
import { PartnersForm } from "../../../components/admin-components/PartnersForm";
import { useLoadingData } from "../../../hook/useLoadingData";

export const EditPartner = () => {
   const { partnerId } = useParams();
   const [currentPartner, setCurrentPartner] = useState();
   const deletePartner = useLoadingData(AdminApi.deletePartners, true);
   const updatePartner = useLoadingData(AdminApi.updatePartners, true);
   const getPartner = useLoadingData(AdminApi.getPartnersAdmin);

   useEffect(() => {
      if (getPartner.data?.partners) {
         setCurrentPartner(getPartner.data.partners.find(({ id }) => id === partnerId));
      }
   }, [getPartner.data]);

   const submitClick = data => {
      const formData = new FormData();
      formData.append("title", data.e.title);
      formData.append("description", data.e.link);
      formData.append("imageURL", data.selectedFile);
      const params = {
         id: partnerId,
         body: formData,
      };
      updatePartner.eventLoading(params);
   };
   const schema = {
      title: yup.string().required("Поле обов'язкове для заповнення").trim(),
      link: yup.string().required("Поле обов'язкове для заповнення").trim(),
   };
   return (
      <section className="page-container">
         <PageHeader
            removeClick={() => deletePartner.eventLoading(partnerId)}
            edit={true}
            title={"Редагувати партнера"}
         />
         <PartnersForm
            isEdit={true}
            smLiable={"Назва партнера*"}
            lgLiable={"Посилання на сайт партнера*"}
            nameButton={"Внести зміни"}
            submitClick={submitClick}
            defaultInfo={currentPartner}
            schema={schema}
         />
      </section>
   );
};
