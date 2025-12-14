package com.example.financial.repository;

import com.example.financial.entity.CommissionInvoice;
import com.example.financial.enums.InvoiceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepository extends JpaRepository<CommissionInvoice, Long> {

    boolean existsByEnquiryId(Long enquiryId);

    Optional<CommissionInvoice> findByEnquiryId(Long enquiryId);

    List<CommissionInvoice> findByVendorId(Long vendorId);

    List<CommissionInvoice> findByVendorIdAndStatus(Long vendorId, InvoiceStatus status);
}