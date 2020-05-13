import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import ICheckoutSession from "../../services/checkoutService/ICheckoutSession";
import CheckoutService from "../../services/checkoutService/CheckoutService";
import PrimaryButton from "../../components/button/primary/PrimaryButton";
import { RouteComponentProps } from "react-router-dom";

const Success: React.FC<RouteComponentProps> = ({history}) => {
  const [session, setSession] = useState<ICheckoutSession>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("session_id")) {
      CheckoutService.getInstance()
        .getSession(params.get("session_id")!)
        .then(setSession);
    } else {
      history.replace('/');
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Thank You</div>
      <div>
        Thank you for making a purchase from Roger Stanger Photos, we hope you
        enjoy your order! Your order has been placed and you will receive a
        confirmation receipt email shortly.
      </div>
      <div>
        <PrimaryButton text={'Back to Gallery'} onClick={() => history.push('/')} />
      </div>
      <div className={styles.row}>
        {session?.items && (
          <div className={styles.items}>
            <div className={styles.subTitle}>Prints</div>
            <div className={styles.table}>
              {session.items.map(item => (
                <React.Fragment key={item.custom.name}>
                  <div>{item.custom.name}</div>
                  <div>£{item.amount / 100}</div>
                  <div>x{item.quantity}</div>
                  <div>£{item.amount / 100 * item.quantity}</div>
                  </React.Fragment>
              ))}
              <div>Total</div>
              <div></div>
              <div></div>
              <div>£{session.items.map(i => i.amount / 100 * i.quantity).reduce((total, amount) => total + amount)}</div>
            </div>
          </div>
        )}
        {session?.address && (
          <div className={styles.address}>
            <div className={styles.subTitle}>Address</div>
            <div>
              <div>{session.name}</div>
              <div>{session.address.line1}</div>
              <div>{session.address.line2}</div>
              <div>{session.address.city}</div>
              <div>{session.address.state}</div>
              <div>{session.address.country}</div>
              <div>{session.address.postal_code}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Success;
