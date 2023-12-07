import React, { useEffect } from "react";
import PrintSettings from "../components/PrintSettings";
import { useNavigate } from "react-router-dom";

function UploadFileUI() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0,0)
    if (user === null) {
      navigate("/Volume/UserRegistration");
    }
  }, [user, navigate]);

  return (
    <div>
      {user !== null ? (
        <div className="md:w-[80%] w-full mt-14 font-loos animate-fade">
          <div className="mainLabelContainer">
            <svg
              className="max-w-[1440px] mx-auto w-full object-contain"
              width="1047"
              height="90"
              viewBox="0 0 1047 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.6039 7.87799H43.4359C66.5639 7.87799 81.7859 16.256 81.7859 33.248V37.378H66.2099V33.248C66.2099 24.044 57.1239 20.268 43.3179 20.268H40.6039C26.5619 20.268 17.8299 23.926 17.8299 30.062V31.36C17.8299 38.204 24.5559 39.738 47.8019 42.452C73.0539 45.638 83.4379 51.892 83.4379 65.226V66.642C83.4379 80.212 69.6319 89.062 43.7899 89.062H41.0759C14.5259 89.062 0.837891 80.094 0.837891 62.984V58.736H16.4139V62.984C16.4139 73.25 25.2639 76.554 41.0759 76.554H43.9079C58.8939 76.554 67.6259 73.368 67.6259 66.878V65.462C67.6259 58.972 60.3099 56.612 37.6539 54.016C14.2899 51.42 2.01789 45.992 2.01789 32.068V30.652C2.01789 16.256 16.8859 7.87799 40.6039 7.87799Z"
                fill="black"
              />
              <path
                d="M198.701 88H183.007V79.032H180.175C176.045 85.05 168.375 89.062 157.283 89.062H120.986C103.876 89.062 94.5539 80.094 94.5539 62.158V28.174H110.248V59.798C110.248 70.3 116.03 76.318 128.302 76.318H164.599C176.399 76.318 183.007 70.182 183.007 59.798V28.174H198.701V88Z"
                fill="black"
              />
              <path
                d="M212.864 0.679993H228.558V37.26H231.272C236.582 30.652 244.606 27.112 254.99 27.112H257.822C275.404 27.112 288.856 36.552 288.856 56.258V59.916C288.856 79.858 275.404 89.062 257.822 89.062H254.99C244.252 89.062 236.228 85.522 231.272 78.796H228.558V88H212.864V0.679993ZM249.444 39.384C237.172 39.384 228.558 45.166 228.558 56.258V60.034C228.558 71.244 237.29 76.79 249.444 76.79H252.158C264.666 76.79 273.044 70.89 273.044 60.034V56.258C273.044 45.402 264.666 39.384 252.158 39.384H249.444Z"
                fill="black"
              />
              <path
                d="M301.48 28.174H317.174V88H301.48V28.174ZM308.678 2.92199H310.094C314.696 2.92199 318.354 6.10799 318.354 10.238C318.354 14.604 314.696 17.672 310.094 17.672H308.678C304.076 17.672 300.418 14.604 300.418 10.238C300.418 6.10799 304.076 2.92199 308.678 2.92199Z"
                fill="black"
              />
              <path
                d="M331.095 28.174H346.789V35.608H349.385C353.397 30.298 359.533 27.112 369.445 27.112C384.549 27.112 392.573 34.546 392.573 51.538V54.96H377.941V52.246C377.941 44.104 372.867 39.738 362.601 39.738C352.217 39.738 346.789 44.104 346.789 52.246V88H331.095V28.174Z"
                fill="black"
              />
              <path
                d="M463.703 27.112H466.535C488.601 27.112 499.339 35.136 499.339 48.942V88H483.645V79.622H480.459C474.323 86.23 465.827 89.062 453.791 89.062C439.159 89.062 429.247 83.28 429.247 71.008C429.247 58.854 438.097 52.482 456.741 52.482H483.645V48.942C483.645 41.272 477.273 37.85 466.417 37.85H463.703C453.319 37.85 446.593 41.154 446.593 48.588H430.899C430.899 35.018 441.873 27.112 463.703 27.112ZM459.101 61.568C449.307 61.568 445.177 64.046 445.177 69.592C445.177 75.02 449.897 77.852 460.399 77.852C470.193 77.852 483.645 74.784 483.645 64.518V61.568H459.101Z"
                fill="black"
              />
              <path
                d="M512.704 28.174H528.398V35.608H530.994C535.006 30.298 541.142 27.112 551.054 27.112C566.158 27.112 574.182 34.546 574.182 51.538V54.96H559.55V52.246C559.55 44.104 554.476 39.738 544.21 39.738C533.826 39.738 528.398 44.104 528.398 52.246V88H512.704V28.174Z"
                fill="black"
              />
              <path
                d="M618.499 27.112H652C672.296 27.112 687.518 35.49 687.518 52.482H671.824C671.824 44.34 664.154 39.384 652 39.384H618.499C605.755 39.384 598.203 45.638 598.203 56.494V60.27C598.203 70.89 605.755 76.79 618.499 76.79H652C663.918 76.79 672.178 72.306 672.178 64.282H687.872C687.872 80.566 672.296 89.062 652 89.062H618.499C596.905 89.062 582.509 79.622 582.509 60.27V56.494C582.509 37.142 596.905 27.112 618.499 27.112Z"
                fill="black"
              />
              <path
                d="M700.671 0.679993H716.365V37.142H719.197C723.327 31.124 730.997 27.112 742.089 27.112H744.331C761.441 27.112 770.763 36.198 770.763 54.016V88H755.069V56.376C755.069 45.874 749.287 39.856 737.015 39.856H734.773C722.973 39.856 716.365 45.992 716.365 56.376V88H700.671V0.679993Z"
                fill="black"
              />
              <path
                d="M784.101 28.174H799.795V88H784.101V28.174ZM791.299 2.92199H792.715C797.317 2.92199 800.975 6.10799 800.975 10.238C800.975 14.604 797.317 17.672 792.715 17.672H791.299C786.697 17.672 783.039 14.604 783.039 10.238C783.039 6.10799 786.697 2.92199 791.299 2.92199Z"
                fill="black"
              />
              <path
                d="M808.406 28.174H825.516L846.756 71.952H851.594L872.362 28.174H888.056L859.618 88H837.434L808.406 28.174Z"
                fill="black"
              />
              <path
                d="M928.167 27.112H930.999C952.121 27.112 967.579 37.024 967.579 56.258V59.916C967.579 79.504 952.121 89.062 930.999 89.062H928.167C906.927 89.062 891.587 79.504 891.587 59.916V56.258C891.587 37.024 906.927 27.112 928.167 27.112ZM928.167 39.384C914.479 39.384 907.281 45.874 907.281 56.258V60.034C907.281 70.418 914.479 76.79 928.167 76.79H930.999C944.687 76.79 951.767 70.418 951.767 60.034V56.258C951.767 45.874 944.687 39.384 930.999 39.384H928.167Z"
                fill="black"
              />
              <path
                d="M1010.33 27.112H1013.04C1032.16 27.112 1045.61 33.366 1045.61 47.172V48.352H1030.03V47.172C1030.03 39.974 1022.6 37.26 1013.04 37.26H1010.33C1000.3 37.26 994.041 39.502 994.041 44.812C994.041 50.594 1000.18 51.774 1015.99 53.072C1038.53 55.078 1046.79 59.916 1046.79 70.3V71.126C1046.79 82.808 1034.99 89.062 1013.51 89.062H1010.8C989.439 89.062 977.639 82.808 977.639 69.12V67.94H993.215V69.12C993.215 75.964 999.233 78.796 1010.8 78.796H1013.51C1026.02 78.796 1031.09 76.436 1031.09 71.362C1031.09 65.816 1025.08 64.164 1008.2 62.866C988.495 61.332 978.347 57.32 978.347 45.874V44.93C978.347 33.13 991.799 27.112 1010.33 27.112Z"
                fill="black"
              />
            </svg>
          </div>
          <div className="flex w-full max-w-[1000px] mx-auto mt-16 min-h-[400px]">
            <PrintSettings />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UploadFileUI;