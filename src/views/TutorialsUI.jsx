import TutorialItemComponent from "../components/TutorialItemComponent.jsx";

export default function TutorialsUI(){
    return(
        <div id="mainTutorialsViewContainer" className="max-w-4xl animate-fade">
            <div id="mainLabelContainer" className="mt-12">
                <p className="LoosFont max-w-4xl text-8xl">
                    Iníciate en la impresión 3D
                </p>
            </div>
            <div id="creaTuPropiaFiguraLabel" className="mt-12">
                <p className="LoosFont text-2xl">¡Crea tu propia figura!</p>
            </div>
            <div className="mt-8">
                <div id="tutorialsFirstDiv" className="bg-azulVolume px-14 py-10">
                    <p className="LoosFont text-3xl">1</p>
                    <p className="LoosFont text-2xl">Descargar modelo</p>
                    <p className="LoosFont text-sm max-w-xs mt-8">Descarga el modelo que más te guste de la web</p>
                </div>
                <div id="tutorialsSecondDiv" className="bg-greenFooter px-14 pb-20 pt-16 flex justify-end -my-20">
                    <div className="w-fit">
                        <p className="LoosFont text-3xl">2</p>
                        <p className="LoosFont text-2xl">Exportar y preparar el archivo STL</p>
                        <p className="LoosFont text-sm max-w-xs mt-8">Si tu archivo del modelo no está en formato STL. Es tan sencillo commo ir al menú del software que está utilizando y clique en “Guardar Como...” o “Exportar” y elegir STL. </p>
                        <p className="LoosFont text-sm max-w-xs mt-4">Esto es necesario para preparar el archivo para imprimir.*</p>
                    </div>
                </div>
                <div id="tutorialsThirdDiv" className="bg-marronPocho px-14 pt-14 pb-20 -my-28">
                    <p className="LoosFont text-3xl">3</p>
                    <p className="LoosFont text-2xl">Preparacion del archivo para la impresora</p>
                    <div className="grid grid-cols-2 max-w-lg gap-8">
                        <div>
                            <p>A.</p>
                            <p>Análisis. Evalúa su espesor, agujeros y ángulos del modelo. </p>
                        </div>
                        <div>
                            <p>B.</p>
                            <p>Estructuras de soporte. Añadir soportes según necesidad.  </p>
                        </div>
                        <div>
                            <p>C.</p>
                            <p>Relleno del modelo. Definir porcentaje y patrón de relleno.  </p>
                        </div>
                        <div>
                            <p>D.</p>
                            <p>Posicionamiento y orientación. Decidir ubicación óptima en la plataforma. </p>
                        </div>
                        <div>
                            <p>E.</p>
                            <p>Generación del G-Code. Traducir modelo a instrucciones para la máquina. </p>
                        </div>
                    </div>
                </div>
                <div id="tutorialsFourthDiv" className="px-14 pt-10 pb-16 flex justify-end bg-pinkVolume">
                    <div className="w-fit">
                        <p className="LoosFont text-3xl">4</p>
                        <p className="LoosFont text-2xl">Impresion 3D</p>
                        <p className="mt-4 max-w-xs">Comprobar temperaturas, usar laca y enviar a G-Code</p>
                    </div>
                </div>
                <div id="tutorialsFifthDiv" className="bg-azulVolume px-14 py-10 -my-10">
                    <p className="LoosFont text-3xl">5</p>
                    <p className="LoosFont text-2xl max-w-md">Extracción de piezas postproceso</p>
                    <p className="text-sm max-w-xs mt-6">Extracción de piezas: Manual o con herramientas según tecnología.</p>
                    <p className="text-sm max-w-xs mt-6">Postprocesado: Quitar soportes, lijar, pulir y aplicar revestimientos</p>
                </div>
            </div>
            <div className="flex justify-end">
                <button className="LoosFont px-6 py-2 rounded-full text-lg bg-greenFooter hover:bg-green-900 hover:text-white transition duration-300 mt-16">Descubre más</button>
            </div>
            <div>
                <p className="LoosFont text-4xl mt-12">
                    Continua aprendiendo
                </p>
            </div>
            <div className="w-full mx-auto mt-6">
                <div className="flex w-full gap-4 overflow-x-auto">
                    <TutorialItemComponent/>
                    <TutorialItemComponent/>
                    <TutorialItemComponent/>
                    <TutorialItemComponent/>
                    <TutorialItemComponent/>
                    <TutorialItemComponent/>
                    <TutorialItemComponent/>
                </div>
            </div>
        </div>
    )
}