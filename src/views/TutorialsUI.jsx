import TutorialItemComponent from "../components/TutorialItemComponent.jsx";

export default function TutorialsUI(){
    return(
        <div id="mainTutorialsViewContainer" className="max-w-4xl">
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
                </div>
                <div id="tutorialsSecondDiv" className="bg-greenFooter px-14 py-10 flex justify-end -my-10">
                    <div className="w-fit">
                        <p className="LoosFont text-3xl">2</p>
                        <p className="LoosFont text-2xl">Exportar y preparar el archivo STL</p>
                    </div>
                </div>
                <div id="tutorialsThirdDiv" className="bg-marronPocho px-14 py-10 -my-10">
                    <p className="LoosFont text-3xl">3</p>
                    <p className="LoosFont text-2xl">Preparacion del archivo para la impresora</p>
                </div>
                <div id="tutorialsFourthDiv" className="px-14 py-10 flex justify-end -my-10">
                    <div className="w-fit">
                        <p className="LoosFont text-3xl">4</p>
                        <p className="LoosFont text-2xl">Impresion 3D</p>
                    </div>
                </div>
                <div id="tutorialsFifthDiv" className="bg-azulVolume px-14 py-10 -my-10">
                    <p className="LoosFont text-3xl">5</p>
                    <p className="LoosFont text-2xl max-w-md">Extracción de piezas postproceso</p>
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