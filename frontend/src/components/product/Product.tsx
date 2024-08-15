import React, { useState } from "react";
import "./Product.scss";
import { Item } from "../../interfaces/Item";
import Reviews from "../../assets/Stars";
import { ConvertPrice } from "../../utils/CurrencyUtils";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HoverCard,
  Skeleton,
  Text,
} from "@radix-ui/themes";
import Logo from "../../assets/Logo";
import { useTranslation } from "react-i18next";
import CarbonFootprint from "./CarbonFootprint";

interface ProductProps {
  item: Item;
}

const Product: React.FC<ProductProps> = ({ item }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [showCarbonFootprint, setShowCarbonFootprint] = useState(false);
  const { t } = useTranslation();

  const handleCompareFootprint = () => {
    setShowCarbonFootprint(true);
  };

  const handleCloseCarbonFootprint = () => {
    setShowCarbonFootprint(false);
  };

  return (
    <article className="product">
      <Skeleton className="border-r-4" loading={imageLoading}>
        <div className="relative">
          <a href="/" className="product-image-container">
            <img
              src={require(`../../assets/products/${item.image}`)}
              alt={item.name}
              className="product-image"
              onLoad={() => setImageLoading(false)}
            />
          </a>
          <button className="product-btn-favorite">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="45">
              {/* SVG path */}
            </svg>
          </button>
          <button className="product-btn-add">{t("product.btn.add")}</button>
        </div>
      </Skeleton>
      <div className="product-content">
        <a href="/" className="product-title">
          {item.name}
        </a>
        <span className="flex justify-between">
          <a href="/">
            <Reviews rating={item.rate} numberOfReviews={item.rateCount} />
          </a>
          <div className="flex gap-2 items-end">
            {item.previousPrice > 0 ? (
              <>
                <p className="product-previous-price">
                  {ConvertPrice(item.previousPrice)}
                </p>
                <p className="product-price-discount">
                  {ConvertPrice(item.price)}
                </p>
              </>
            ) : (
              <>
                <p className="product-price">{ConvertPrice(item.price)}</p>
              </>
            )}
          </div>
        </span>
        <span className="flex justify-between">
          <div className="inline-flex items-center gap-2">
            {/* Removed button */}
          </div>
          <div className="flex justify-end gap-2 w-fit">
            {item.labels.map((label, index) => (
              <HoverCard.Root key={index}>
                <HoverCard.Trigger>
                  <img
                    key={index}
                    src={require(`../../assets/labels/${label.image_url}`)}
                    alt={label.name}
                    className="product-label-image cursor-help"
                  />
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Avatar
                      radius="none"
                      size="3"
                      fallback={
                        <Logo size={30} color="green" iconOnly={true} />
                      }
                      src={require(`../../assets/labels/${label.image_url}`)}
                    />
                    <Box>
                      <Heading size="3" as="h3">
                        {label.name}
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        {label.category}
                      </Text>
                      <Text as="div" size="2">
                        {label.description}
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>
            ))}
            <HoverCard.Root>
              <HoverCard.Trigger>
                <img
                  src={require(
                    `../../assets/labels/greenScore/${item.greenScore.toLowerCase()}.png`,
                  )}
                  alt={item.greenScore}
                  className="product-label-image cursor-help"
                />
              </HoverCard.Trigger>
              <HoverCard.Content maxWidth="300px">
                <Flex gap="1" direction="column">
                  <img
                    src={require(
                      `../../assets/labels/greenScore/greenScore.png`,
                    )}
                    alt="GreenScore Logo"
                  />
                  <Heading size="3" as="h3">
                    Score {item.greenScore}
                  </Heading>
                  <Text as="div" size="2" color="gray" mb="2">
                    Environmental Impact Score
                  </Text>
                  <Text as="div" size="2">
                    Measures the environmental impact of the product on a scale
                    of A to E. It is calculated based on the product's carbon
                    footprint, water usage, and waste production.
                  </Text>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
          </div>
        </span>
        <button
          onClick={handleCompareFootprint}
          className="compare-footprint-btn"
        >
          Compare Footprint
        </button>
      </div>
      {showCarbonFootprint && (
        <CarbonFootprint item={item} onClose={handleCloseCarbonFootprint} />
      )}
    </article>
  );
};

export default Product;
