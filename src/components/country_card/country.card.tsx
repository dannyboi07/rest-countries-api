import { useState, useEffect } from "react";
import styles from "./country.module.css";

type country = {
    name: string,
    flag: string,
    population: string,
    region: string,
    capital: string;
};

interface Props {
    country: country;
}

function CountryCard({ country }: Props) {
    const [cardClasses, setCardClasses] = useState([styles.country_card])
    
    useEffect(() => {
        setCardClasses([
            ...cardClasses,
            styles.country_card__loaded
        ])
    }, [])

    return (
        <div className={cardClasses.join(" ")}>
            <div className={styles.country_card__top}>
                <img src={country.flag} alt="country flag" />
            </div>

            <div className={styles.country_card__bottom}>
                <p className={styles.country_card__bottom__header}>
                    {country.name}
                </p>

                <div className={styles.country_card__bottom__details}>
                    <p>
                        <span className={styles.country_card__bottom__details__field}>
                            Population:&nbsp;
                        </span>
                        {country.population}
                    </p>
                    <p>
                        <span className={styles.country_card__bottom__details__field}>
                            Region:&nbsp;
                        </span>
                        {country.region}
                    </p>
                    <p>
                        <span className={styles.country_card__bottom__details__field}>
                            Capital:&nbsp;
                        </span>
                        {country.capital}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CountryCard;