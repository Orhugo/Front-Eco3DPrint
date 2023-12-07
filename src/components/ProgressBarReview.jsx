export default function ProgressBarReview({value}){

    return(
        <div id="progressBarBackground" className="rounded-full bg-chillGrey h-3 mx-3 my-1 w-full">
            <div id="progressBar" className="rounded-full bg-blueVolume h-full" style={{width: value + '%'}}>

            </div>
        </div>
    )
}