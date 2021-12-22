import React from 'react'
import { useSelector } from 'react-redux';
import Create from './Create'

const CreateDemografik = () => {
    const data = useSelector(state=>state.demografik.demografikData)
    const forms = [
        {
          type: "text",
          apiName: "description",
          title: "Açıklama",
          placeholder: "Açıklama Giriniz...",
        },
        {
          type: "select",
          apiName: "fieldTypeId",
          title: "Veri Tipini Seçin",
          placeholder: "Açıklama Giriniz...",
        },
      ];
      const options = [
        { value: "1", label: "Sayı" },
        { value: "2", label: "Metin" },
        { value: "3", label: "Tarih" },
      ];
    return (
        <>
        <Create forms={forms} options={options} data={data} />
        
        </>
    )
}

export default CreateDemografik
