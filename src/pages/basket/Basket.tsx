import React, { useCallback, useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import BasketService from "../../services/basketService/BasketService";
import IBasketItem from "../../services/basketService/IBasketItem";
import Card from "../../components/card/Card";
import ImageService from "../../services/imageService/ImageService";
import Masonry from "react-masonry-component";
import { loadStripe, Stripe, StripeError } from "@stripe/stripe-js";
import PrimaryButton from "../../components/button/primary/PrimaryButton";
import CheckoutService from "../../services/checkoutService/CheckoutService";
import Dialog from "../../components/dialog/Dialog";
import SecondaryButton from "../../components/button/secondary/SecondaryButton";
import { RouteComponentProps } from 'react-router-dom';

function getBasketTotal(basket: IBasketItem[]) {
  if (!basket.length) return 0;
  return basket
    .map(
      item =>
        (item.framed ? item.price.framed : item.price.unframed) * item.quantity
    )
    .reduce((total, price) => total + price);
}

const Basket: React.FC<RouteComponentProps> = ({history}) => {
  const [basket, setBasket] = useState<IBasketItem[]>([]);
  const [stripePromise, setStripePromise] = useState<
    Promise<Stripe | null> | undefined
  >(undefined);

  const [deleteItem, setDeleteItem] = useState<IBasketItem | undefined | null>(
    undefined
  );

  const [error, setError] = useState<Error | StripeError | undefined>();

  useEffect(() => {
    CheckoutService.getInstance()
      .getPublicKey()
      .then(key => setStripePromise(loadStripe(key)));
  }, []);

  const onDelete = useCallback(() => {
    if (deleteItem === undefined) return;
    const basketService = BasketService.getInstance();

    if (deleteItem) {
      basketService
        .removeFromBasket(deleteItem)
        .then(() => setBasket(basket.filter(item => item.id !== deleteItem.id)))
        .catch(console.error);
    } else {
      basketService
        .emptyBasket()
        .then(() => setBasket([]))
        .catch(console.error);
    }

    setDeleteItem(undefined);
  }, [basket, deleteItem]);

  const onSetDeleteItem = useCallback(
    (basketItem: IBasketItem | undefined | null) => {
      setDeleteItem(basketItem);
    },
    []
  );

  const onCheckout = useCallback(async () => {
    const sessionId = await CheckoutService.getInstance().getSecretKey();
    const stripe = await stripePromise;

    if (!stripe) {
      const err = new Error(
        "Stripe is not configured correctly on the client. This is our fault, not yours, so please let us know."
      );
      console.error(err);
      setError(err);
      return;
    }

    const { error } = await stripe!.redirectToCheckout({
      sessionId
    });

    if (error) {
      console.error(error);
      setError(error);
    }
  }, [stripePromise]);

  React.useEffect(() => {
    BasketService.getInstance()
      .getBasket()
      .then(basketItems => {
        if ((basketItems as { msg: string }).msg) {
          throw new Error((basketItems as { msg: string }).msg);
        } else {
          setBasket(basketItems as IBasketItem[]);
        }
      });
  }, []);

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error.message}</div>}
      <div className={styles.subTitle}>Basket</div>
      <div className={styles.basket}>
        {basket.length ? (
          <>
            <div className={styles.controls}>
              <div>Basket Total: £{getBasketTotal(basket)}</div>
              <PrimaryButton onClick={onCheckout} text={"Checkout"} />
              <PrimaryButton onClick={() => history.push('/')} text={"Add more"} />
              <SecondaryButton
                onClick={() => onSetDeleteItem(null)}
                text={"Empty basket"}
              />
            </div>

            <Masonry className={styles.cards}>
              {basket.map(item => (
                <Card
                  key={item.id}
                  image={item.image}
                  imageService={ImageService.getInstance()}
                  height={item.image.height * (360 / item.image.width)}
                  showLocation={false}
                  showTags={false}
                  showDescription={false}
                  showTime={false}
                  showPriceInfo={true}
                  basketItem={item}
                  onDelete={onSetDeleteItem}
                />
              ))}
            </Masonry>
          </>
        ) : (
          <div>
            Your basket is empty right now. Go to the gallery and add some then
            check out here.
          </div>
        )}
      </div>
      <Dialog
        isOpen={deleteItem !== undefined}
        onDismiss={() => onSetDeleteItem(undefined)}
      >
        <div className={styles.subSubTitle}>Are you sure?</div>
        <div>
          {deleteItem !== null
            ? "Are you sure you want to delete this order from your basket?"
            : "Are you sure you want to empty your basket? This will remove all orders."}
        </div>
        <PrimaryButton text={"Delete"} onClick={onDelete} />
        <SecondaryButton
          text={"Cancel"}
          onClick={() => onSetDeleteItem(undefined)}
        />
      </Dialog>
    </div>
  );
};

export default Basket;
