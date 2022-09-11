package com.simbirsoft.simbirsocial.domain;

import com.simbirsoft.simbirsocial.domain.enumeration.Category;
import com.simbirsoft.simbirsocial.domain.enumeration.Publish;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * Создание нового мероприятия\nEvents
 */
@Schema(description = "Создание нового мероприятия\nEvents")
@Entity
@Table(name = "events")
public class Events implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "jhi_user")
    private String user;

    @Enumerated(EnumType.STRING)
    @Column(name = "pubish")
    private Publish pubish;

    @Enumerated(EnumType.STRING)
    @Column(name = "category")
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Events id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Events name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Events description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Events date(LocalDate date) {
        this.setDate(date);
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getLatitude() {
        return this.latitude;
    }

    public Events latitude(Double latitude) {
        this.setLatitude(latitude);
        return this;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return this.longitude;
    }

    public Events longitude(Double longitude) {
        this.setLongitude(longitude);
        return this;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getUser() {
        return this.user;
    }

    public Events user(String user) {
        this.setUser(user);
        return this;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Publish getPubish() {
        return this.pubish;
    }

    public Events pubish(Publish pubish) {
        this.setPubish(pubish);
        return this;
    }

    public void setPubish(Publish pubish) {
        this.pubish = pubish;
    }

    public Category getCategory() {
        return this.category;
    }

    public Events category(Category category) {
        this.setCategory(category);
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Events)) {
            return false;
        }
        return id != null && id.equals(((Events) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Events{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", user='" + getUser() + "'" +
            ", pubish='" + getPubish() + "'" +
            ", category='" + getCategory() + "'" +
            "}";
    }
}
