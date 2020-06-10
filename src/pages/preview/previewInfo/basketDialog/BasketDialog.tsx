import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BasketDialog.module.scss";
import IBasketDialogProps from "./IBasketDialogProps";
import { range } from "lodash";
import Dropdown from "../../../../components/dropdown/Dropdown";
import Checkbox from "../../../../components/checkbox/Checkbox";
import PrimaryButton from "../../../../components/button/primary/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import BasketService from "../../../../services/basketService/BasketService";
import Dialog from "../../../../components/dialog/Dialog";

const BasketDialog: React.FC<IBasketDialogProps> = ({
  onDismiss,
  image,
  prices,
  history
}) => {
  const basketService = useRef(BasketService.getInstance());

  const [priceId, setPriceId] = useState<number>(prices[0]?.id);
  const [framed, setFramed] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [added, setAdded] = useState(false);

  const getPrice = useCallback(() => {
    const price = prices?.find(p => p.id === priceId);
    const priceValue = framed ? price?.framed : price?.unframed;
    return (priceValue || 0) * (quantity || 0);
  }, [prices, priceId, framed, quantity]);

  const addToBasket = useCallback(() => {
    const price = prices?.find(p => p.id === priceId);
    if (!price) throw new Error("Attempted to add to basket with no price set");
    basketService.current
      .addToBasket(image, price, quantity, framed)
      .then(() => {
        setAdded(true);
        setTimeout(() => history.push('/basket'), 500);
      })
      .catch(console.error);
  }, [framed, image, priceId, prices, quantity, history]);

  useEffect(() => {
    const price = prices?.find(p => p.id === priceId);
    if(price?.framed === null && framed) {
      setFramed(false);
    }
  }, [prices, priceId, framed])

  return (
    <Dialog isOpen={true} onDismiss={onDismiss}>
      <div className={styles.closeBtn} onClick={onDismiss}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <div className={styles.subTitle}>Add To Basket</div>
      {!added ? (
        <div className={styles.form}>
          <label>
            <div>Size</div>
            <Dropdown
              value={priceId?.toString()}
              onChange={val => setPriceId(parseInt(val))}
              options={
                prices?.map(price => ({
                  key: price.id.toString(),
                  value: price.name
                })) || []
              }
            />
          </label>
          <label>
            Quantity
            <Dropdown
              value={quantity.toString()}
              onChange={val => setQuantity(parseInt(val))}
              options={range(1, 10).map(q => ({
                key: q.toString(),
                value: q.toString()
              }))}
            />
          </label>
          {prices.find(price => price.id === priceId)?.framed && <div>
            <Checkbox checked={framed} onChange={setFramed} label={image.priceGroup.name !== "Other" ? "Framed" : "Pack of 8"} />
          </div>}
          <div className={styles.subSubTitle}>Price: £{getPrice().toFixed(2)}</div>
          <PrimaryButton
            onClick={addToBasket}
            text={"Add"}
            disabled={
              priceId === undefined || !quantity || framed === undefined
            }
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: 100 }}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      )}
    </Dialog>
  );
};

export default BasketDialog;
