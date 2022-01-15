package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepo extends JpaRepository<Report, Long> {
}
