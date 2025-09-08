import { X } from "lucide-react";
import { layout } from "../page";
import Image from "next/image";

export default function PreviewPane({
  selectedLayout,
  viewPreviewPane,
  setViewPreviewPane,
  photos,
}: {
  selectedLayout: layout;
  viewPreviewPane: boolean;
  setViewPreviewPane: (viewPreviewPane: boolean) => void;
  photos: File[];
}) {
  return (
    <>
      {viewPreviewPane &&
        (selectedLayout.photos === 4 ? (
          <div
            onClick={() => setViewPreviewPane(false)}
            className="text-white bg-black/70 h-screen w-screen fixed top-0 left-0 z-10 flex justify-center items-center flex-col gap-y-5"
          >
            <div
              className="w-[275px] h-[825px] sm:w-[302.2px] sm:h-[906.6px] bg-black overflow-hidden pt-4 px-2"
              onClick={(e) => e.stopPropagation()}
            >
              {photos.length > 0 && (
                <div className="mb-10 overflow-hidden flex items-center flex-col gap-y-2">
                  {photos.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <img
                        key={index}
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="object-cover opacity-100 w-[252.31px] h-[159.61px] sm:w-[277.27px] sm:h-[175.39px]"
                        onLoad={(e) =>
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
              <Image
                src="/clickd_white.svg"
                alt="clickd Logo"
                height={125}
                width={125}
                className="cursor-pointer mb-7 sm:mb-10 mx-auto"
              />
              <Image
                src="/strip_prevew_footer.png"
                alt="Strip Contancts"
                width={281}
                height={35}
              />
            </div>

            <div
              className="bg-white/40 rounded-full py-1 px-1 absolute top-5 right-2 sm:right-5 cursor-pointer"
              onClick={() => setViewPreviewPane(false)}
            >
              <X />
            </div>
            <div className="text-lg selection:text-black selection:bg-white hidden sm:inline">
              Note: Any Adjustments you can enter it in the Addition information
              box in the next page, We'll try our best.
            </div>
          </div>
        ) : selectedLayout.photos === 3 ? (
          <div
            className="text-white bg-black/70 h-screen w-screen fixed top-0 left-0 z-10 flex justify-center items-center flex-col gap-y-5"
            onClick={() => setViewPreviewPane(false)}
          >
            <div className="w-[275.48px] h-[825px] sm:w-[302.73px] sm:h-[906.6px] bg-black overflow-hidden pt-4 px-2">
              {photos.length > 0 && (
                <div
                  className="mb-10 overflow-hidden flex items-center flex-col gap-y-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {photos.map((file, index) => {
                    const url = URL.createObjectURL(file);
                    return (
                      <img
                        key={index}
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="object-cover opacity-100 w-[252.22px] h-[215.15px] sm:w-[277.17px] sm:h-[236.43px]"
                        onLoad={(e) =>
                          URL.revokeObjectURL(
                            (e.target as HTMLImageElement).src
                          )
                        }
                      />
                    );
                  })}
                </div>
              )}
              <Image
                src="/clickd_white.svg"
                alt="clickd Logo"
                height={125}
                width={125}
                className="cursor-pointer mb-7 sm:mb-10 mx-auto"
              />
              <Image
                src="/strip_prevew_footer.png"
                alt="Strip Contancts"
                width={281}
                height={35}
              />
            </div>

            <div
              className="bg-white/40 rounded-full py-1 px-1 absolute top-5 right-2 sm:right-5 cursor-pointer"
              onClick={() => setViewPreviewPane(false)}
            >
              <X />
            </div>

            <div className="text-lg  selection:text-black selection:bg-white hidden sm:inline">
              Note: Any Adjustments you can enter it in the Addition information
              box in the next page, We'll try our best.
            </div>
          </div>
        ) : null)}
    </>
  );
}
