export default function CommentItem({ name, content, index, lastname }) {
    const rotationNumber = Math.floor(Math.random() * 2);
    const bgNumber = Math.floor(Math.random() * 3);
    const bgBlue = 'bg-azulVolume';
    const bgGreen = 'bg-greenFooter';
    const bgPink = 'bg-pinkVolume';
    const rotation = 'rotate-6';
    const rotationNeg = '-rotate-6';

    const bgColors = ['bg-azulVolume', 'bg-greenFooter', 'bg-pinkVolume'];
    const bgColorIndex = index % bgColors.length;
    const choosenBg = bgColors[bgColorIndex];

    // const choosenBg = () => {
    //     if (bgNumber === 1) {
    //         return bgBlue;
    //     } else if (bgNumber === 2) {
    //         return bgGreen;
    //     } else {
    //         return bgPink;
    //     }
    // };

    const choosenRotation = () => {
        return rotationNumber === 0 ? rotation : rotationNeg;
    };

    return (
        <div className="bg-marronPocho w-96 h-52 rounded-2xl">
            <div className={`${choosenBg} w-full h-full p-6 rounded-2xl transform ${choosenRotation()}`}>
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                    <div className="text-2xl">{name} {lastname}</div>
                </div>
                <div className="text-sm mt-2">{content}</div>
            </div>
        </div>
    );
}
