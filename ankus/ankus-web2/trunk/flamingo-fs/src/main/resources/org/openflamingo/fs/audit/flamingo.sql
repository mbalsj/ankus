DROP TABLE IF EXISTS AUDIT_LOG;

CREATE TABLE AUDIT_LOG (
  ID              INT(11)      NOT NULL AUTO_INCREMENT COMMENT 'Sequence',
  CLUSTER_ID      INT(11)      DEFAULT NULL COMMENT 'Hadoop Cluster Identifier',
  CLUSTER_NAME    VARCHAR(250) DEFAULT NULL COMMENT 'Hadoop Cluster Name',
  FROM_PATH       TEXT         DEFAULT NULL COMMENT 'From Path',
  TO_PATH         TEXT         DEFAULT NULL COMMENT 'To Path',
  LENGTH          LONG         DEFAULT NULL COMMENT 'Total File Size',
  FS_TYPE         VARCHAR(50)  NOT NULL COMMENT 'File System Type',
  AUDIT_TYPE      VARCHAR(50)  NOT NULL COMMENT 'Audit Type',
  FILE_TYPE       VARCHAR(50)  NOT NULL COMMENT 'File Type',
  WORK_DATE       DATETIME     COMMENT 'Work Date',
  USERNAME        VARCHAR(50)  NOT NULL COMMENT 'Writer',
  PRIMARY KEY (ID)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = UTF8;