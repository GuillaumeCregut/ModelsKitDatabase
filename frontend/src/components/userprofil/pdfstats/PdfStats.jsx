import { useEffect, useState } from 'react';
import useAxiospdfBlob from '../../../hooks/useAxiospdfBlob';
import useAuth from '../../../hooks/useAuth';
import { AwaitLoad } from '../../awaitload/AwaitLoad';
import { toast } from 'react-toastify';

import './PdfStats.scss';

const PdfStats = () => {
    const axiosPrivate = useAxiospdfBlob();
    const [path, setPath] = useState('');
    const { auth } = useAuth();
    let idUser = auth?.id;
    if (!idUser) {
        idUser = 0;
    }


    useEffect(() => {
        const getPdf = () => {
            const url = `${import.meta.env.VITE_APP_API_URL}stats/${idUser}`;
            axiosPrivate
                .get(url)
                .then((resp) => {
                    const href = URL.createObjectURL(resp.data);
                    setPath(href)
                })
                .catch((err) => {
                    toast.error('Une erreur est survenue');
                })
        }
        getPdf();
    }, [])

    return (
        <section className='pdf-container'>
            <h1 className='pdf-title'>Statistiques</h1>
            {path === ''
                ? <AwaitLoad />
                : (
                    <div className="pdf-object-container">
                        <object data={path} type="application/pdf" className='pdf-object'>
                            <a href={path} target='_blank'>PDF</a>
                        </object>
                    </div>

                )}

        </section>
    )
}

export default PdfStats
