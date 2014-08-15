class User < ActiveRecord::Base

  has_secure_password

  has_many :jobs, foreign_key: "student_id", dependent: :destroy
  has_many :students, through: :jobs, source: :student
  has_many :reverse_jobs, foreign_key: "tutor_id",
                          class_name: "Job",
                          dependent: :destroy
  has_many :tutors, through: :reverse_jobs, source: :tutor

end
