package dev.daly.contacts.views;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.converter.StringToIntegerConverter;
import com.vaadin.flow.data.validator.EmailValidator;
import com.vaadin.flow.shared.Registration;
import dev.daly.contacts.data.Contact;

public class ContactForm extends FormLayout {
    Binder<Contact> binder = new BeanValidationBinder<>(Contact.class);
    TextField firstName = new TextField("First name");
    TextField lastName = new TextField("Last name");

    EmailField email = new EmailField("Email");
    TextField age = new TextField("Age");
    TextField phone = new TextField("Phone");

    Button save = new Button("Save");
    Button delete = new Button("Delete");
    Button cancel = new Button("Cancel");
    private Contact contact;

    public ContactForm() {
        addClassName("contact-form");
        binder.bindInstanceFields(this);
        add(firstName, lastName, email, age, phone, createButtonsLayout());
    }

    public void setContact(Contact contact) {
        this.contact = contact;
        binder.setBean(contact);
        binder.readBean(contact);
    }

    private Component createButtonsLayout() {
        save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        delete.addThemeVariants(ButtonVariant.LUMO_ERROR);
        cancel.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        save.addClickListener(event -> validateAndSave());
        delete.addClickListener(event -> fireEvent(new DeleteEvent(this, contact)));
        cancel.addClickListener(event -> fireEvent(new CloseEvent(this)));
        save.addClickShortcut(Key.ENTER);
        cancel.addClickShortcut(Key.ESCAPE);
        return new HorizontalLayout(save, delete, cancel);
    }

    private void validateAndSave() {
        binder.forField(email)
                .withValidator(new EmailValidator(
                        "This doesn't look like a valid email address"))
                .bind(Contact::getEmail, Contact::setEmail);
        if (!binder.validate().hasErrors()) {
            fireEvent(new SaveEvent(this, binder.getBean()));
        }
    }

    public static abstract class ContactFormEvent extends ComponentEvent<ContactForm> {
        private final Contact contact;

        protected ContactFormEvent(ContactForm source, Contact contact) {
            super(source, false);
            this.contact = contact;
        }

        public Contact getContact() {
            return contact;
        }
    }

    public static class SaveEvent extends ContactFormEvent {
        SaveEvent(ContactForm source, Contact contact) {
            super(source, contact);
        }
    }

    public static class DeleteEvent extends ContactFormEvent {
        DeleteEvent(ContactForm source, Contact contact) {
            super(source, contact);
        }

    }

    public static class CloseEvent extends ContactFormEvent {
        CloseEvent(ContactForm source) {
            super(source, null);
        }
    }

    public Registration addDeleteListener(ComponentEventListener<DeleteEvent> listener) {
        return addListener(DeleteEvent.class, listener);
    }

    public Registration addSaveListener(ComponentEventListener<SaveEvent> listener) {
        return addListener(SaveEvent.class, listener);
    }

    public Registration addCloseListener(ComponentEventListener<CloseEvent> listener) {
        return addListener(CloseEvent.class, listener);
    }

}
