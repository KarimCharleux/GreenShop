import React, { useEffect, useState } from "react";
import "./MostWantedProducts.scss";
import axios from "axios";
import { Item } from "../../interfaces/Item";
import Product from "./Product";
import CarbonFootprint from "./CarbonFootprint";
import { useTranslation } from "react-i18next";

function MostWantedProducts() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const itemsPerPage = 4;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/items`,
        );
        const items: Item[] = response.data;
        if (items.length > 0) {
          items.sort((a, b) => b.rate - a.rate);
          const filteredItems = items.filter((item) => {
            try {
              require(`../../assets/products/${item.image}`);
              return true;
            } catch (e) {
              return false;
            }
          });
          setItems(filteredItems);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleCompareFootprint = (item: Item) => {
    setSelectedItem(item);
  };

  const handleCloseCarbonFootprint = () => {
    setSelectedItem(null);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < items.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <section className="section-container flex flex-col justify-evenly items-center gap-6 relative">
      <h2 className="section-title text-green">{t("product.mostWanted")}</h2>
      <p className="section-subtitle">{t("product.mostWantedSub")}</p>
      <div className="flex items-center justify-between w-full relative">
        {currentPage > 0 && (
          <img
            src={require("../../assets/previous-arrow.png")}
            alt="Previous"
            onClick={handlePreviousPage}
            className="navigation-arrow previous-arrow"
          />
        )}
        <div className="grid grid-cols-4 grid-rows-1 gap-6 flex-grow max-xl:grid-cols-2 max-xl:grid-rows-2 max-md:grid-rows-4 max-md:grid-cols-1">
          {paginatedItems.map((item: any, index: number) => (
            <div key={index}>
              <Product item={item} />
              <button onClick={() => handleCompareFootprint(item)}>
                Compare Footprint
              </button>
            </div>
          ))}
        </div>
        {(currentPage + 1) * itemsPerPage < items.length && (
          <img
            src={require("../../assets/next-arrow.png")}
            alt="Next"
            onClick={handleNextPage}
            className="navigation-arrow next-arrow"
          />
        )}
      </div>
      {selectedItem && (
        <CarbonFootprint
          item={selectedItem}
          onClose={handleCloseCarbonFootprint}
        />
      )}
    </section>
  );
}

export default MostWantedProducts;
