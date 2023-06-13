package dev.daly.contacts.data;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;


    public List<Contact> getAllContacts(){
        return contactRepository.findAll();
    }

    public Contact getContactById(Long id){
        return contactRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Contact not found"));
    }

    public List<Contact> findContactsByName(String name) {
        return contactRepository.findContactsByNameContains(name);
    }

    public void removeContact(Long id){
        contactRepository.deleteById(id);
    }

    public void createContact(String firstName, String lastName, int age, String phone) {
        contactRepository.save(new Contact(firstName, lastName, age, phone));
    }

    public void updateContact(Contact contact) {
        contactRepository.save(contact);
    }



}
