import './catalog.scss'
type CatalogProps = {
    data: { title: string, detail: string }[];
};

function Catalog({ data }: CatalogProps) {
    return (
        <>
            <div className=" d-flex justify-content-center mt-5 flex-wrap flex-sm-nowrap gap-4">
                {data.map((el, index) => (
                    <div key={index} className='title'>
                        <div className='text-center'>
                            <h4 >
                                {el.title}
                            </h4>
                            <div className='d-flex flex-wrap justify-content-center '>
                                <div className='w-75 horver text-scale'>
                                    {el.detail}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Catalog