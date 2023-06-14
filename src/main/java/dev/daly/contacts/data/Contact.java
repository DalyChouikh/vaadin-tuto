package dev.daly.contacts.data;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "contacts")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Contact {
    @Id
    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is required")
    private String email;
    @NotEmpty(message = "First name is required")
    @Column(name = "first_name", length = 50, nullable = false)
    @Length(min = 3, max = 50, message = "First name must be between 3 and 50 characters")
    private String firstName;
    @NotEmpty(message = "Last name is required")
    @Column(name = "last_name", length = 50, nullable = false)
    @Length(min = 3, max = 50, message = "Last name must be between 3 and 50 characters")
    private String lastName;
    @NotEmpty(message = "Age is required")
    @Min(value = 18, message = "Age must be greater than 18")
    @Column(name = "age", nullable = false)
    private String age;
    @NotEmpty(message = "Phone is required")
    @Column(name = "phone", length = 50, nullable = false)
    @Length(min = 8, max = 8, message = "Phone number must be 8 digits")
    private String phone;

}
