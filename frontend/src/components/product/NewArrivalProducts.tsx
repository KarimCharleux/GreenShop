import React, { useEffect, useState } from "react";
import "./NewArrivalProducts.scss";
import axios from "axios";
import { Item } from "../../interfaces/Item";
import Product from "./Product";
import { useTranslation } from "react-i18next";

function NewArrivalProducts() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
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
          // Sort by the most recent
          items.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
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

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="new-section-container flex flex-col justify-evenly items-center gap-6">
      <h2 className="section-title text-green">{t("product.newArrivals")}</h2>
      <p className="section-subtitle">{t("product.newArrivalsSub")}</p>
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
            <Product item={item} key={index} />
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
      <button className="btn-see-more">{t("product.seeMore")}</button>
    </section>
  );
}

export default NewArrivalProducts;
