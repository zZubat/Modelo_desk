import React, { useCallback, useEffect, useState} from 'react';
import { remote } from 'electron';
import path from 'path';
import fs from 'fs';
import GlobalMenu from '../../components/GlobalMenu';
import api from '../../services/api';
import { date } from 'yup';


const DeliverymenList = () => {
    const [deliverymen, setDeliverymen] = useState([]);
    const [perPage, setPerpage] = useState(5);

    const loadingDeliverymen = useCallback(async () => {
        try {
            const response = await api.get(`/users?per_page=${perPage}`);

            if (response.data){
                setDeliverymen(response.data);
            }else {
                alert("Não foi encontrado Nenhum Entregador")
            }
        } catch (error) {
            alert(`Ocorreu uma falha ao  retornar a lista de Entregadores. ${error}`)
        }
    }, [perPage]);

    useEffect(() =>{
        loadingDeliverymen()
    }, [loadingDeliverymen]);

    const ShowNotification = (title, msg) => {
        const notification = { 
            title: title,
            body: msg,
            icon: path.join(__dirname, '../../assets/logo.png'),
        }
        new remote.Notification(notification).show();
    }

    const savePdf = async () => {
        const filePath = path.join(__dirname, `../../assets/lista_de_entregadores${new Date().toDateString()}.pdf`);
        const win = remote.BrowserWindow.getFocusedWindow(); 
        const options = {
            marginsType: 0,
            pageSize: 'A4',
            printBackground: true,
            landscape: false,
        }

        try {
            const pdf = await win.webContents.printToPDF(options);
            fs.writeFile(filePath, pdf, (error) => {
                if (error){
                    ShowNotification('Error', `erro ao salvar arquivo. ${error}`);
                } else {
                    ShowNotification('PDF Exportado', `PDF exportado com sucesso`)
                    console.log('PDF Exportado com Sucesso.')
                }
            });
        } catch (error) {
            ShowNotification('Error', `erro ao gerar arquivo. ${error}`);
        }
    };

    return(
        <>
            <GlobalMenu />
            <h1>Lista De Entregadores</h1>
            <div>
                <label htmlFor="per_page">Quantidade de Páginas</label>
                <input 
                        type="number"
                        id="per_page"
                        name="per_page"
                        min="1"
                        max="100"
                        value={perPage}
                        onChange={(e) => setPerpage(e.target.value)}                        
                        />
            </div>
            <div>
                <button
                id=''
                type='button'
                onClick={() => savePdf()}
                >
                    Exportar PDF
                </button>
            </div>
            <ul>
                {deliverymen.map((d) => {
                    return(
                        <li key={d.id}>
                            <img src={d.avatar_url}/>
                            <span>{d.login}</span>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default DeliverymenList;